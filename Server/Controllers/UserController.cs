using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profile.Context;
using Profile.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.Include(x => x.Layout).Include(x => x.Links).ToListAsync();
        }

        
        [HttpGet("/api/Nickname")]
        public ActionResult GetUser([FromQuery] string nickname)
        {
            var result = from user in _context.User
                            join layout in _context.Layout on user.Id equals layout.UserId
                            join profilelinks in _context.ProfileLinks on user.Id equals profilelinks.UserId
                            join interests in _context.Interests on user.Id equals interests.UserId
                            where user.Nickname == nickname
                            select new
                            {
                               user, layout, profilelinks, interests // Include the associated layout
                            };

            var userWithLayout = result.FirstOrDefault();

            if (userWithLayout == null)
            {
                return NotFound();
            }

            return Ok(userWithLayout.user);
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
        private bool UserExists(string nickname)
        {
            return _context.User.Any(u => u.Nickname == nickname);
        }
    

        [HttpPatch("{nickname}")]
        public async Task<IActionResult> PatchUser(string nickname, [FromBody] User user)
        {
            try
            {
                if (nickname != user?.Nickname)
                {
                    return BadRequest("Nickname in URL does not match the nickname in the request body.");
                }

                // Find the user by nickname
                var existingUser = await _context.User
                    .Include(u => u.Layout)
                    .Include(u => u.Links)
                    .Include(u => u.Interests)
                    .FirstOrDefaultAsync(u => u.Nickname == nickname);

                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }

                // Update only the properties that are present in the request body
                foreach (var property in user.GetType().GetProperties())
                {
                    // Exclude the 'Id' property
                    if (property.Name != "Id")
                    {
                        var newValue = property.GetValue(user);
                        if (newValue != null)
                        {
                            var existingProperty = existingUser.GetType().GetProperty(property.Name);
                            if (existingProperty != null && existingProperty.CanWrite)
                            {
                                existingProperty.SetValue(existingUser, newValue, null);
                            }
                        }
                    }
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request. Details: " + ex.Message);
            }
        }


    }
}