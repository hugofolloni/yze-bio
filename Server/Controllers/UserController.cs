
using System;
using System.IO;
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
        private readonly string _ApiKey;

        private bool IsValidApiKey(string key)
        {
            return key == _ApiKey;
        }

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _ApiKey = configuration["ApiSettings:ApiKey"];
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser([FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }
            return await _context.User.Include(x => x.Layout).Include(x => x.Links).ToListAsync();
        }

        
        [HttpGet("/api/Nickname")]
        public ActionResult GetUser([FromQuery] string nickname, [FromQuery] string key)
        {

            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            var result = _context.User.Include(x => x.Layout).Include(x => x.Links).Include(x => x.Interests).Where(x => x.Nickname == nickname).ToList();

            var userWithLayout = result.FirstOrDefault();

            if (userWithLayout == null)
            {
                return NotFound();
            }

            return Ok(userWithLayout);
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

               // POST: api/User
        [HttpPost("/api/WithPhoto")]
        public async Task<ActionResult<User>> PostUser(IFormFile profileImage, User user, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            if (profileImage == null || profileImage.Length == 0)
            {
                return BadRequest("No image selected");
            }

            if (!ValidateImage(profileImage)) 
            {
                return BadRequest("Invalid image format");
            }

            string imageUrl = await StoreProfileImage(profileImage); 
            user.Photo = imageUrl;

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        private bool ValidateImage(IFormFile profileImage)
        {
            string[] validExtensions = { ".jpg", ".jpeg", ".png", ".gif" }; 
            return validExtensions.Contains(Path.GetExtension(profileImage.FileName).ToLower());
        }

        private async Task<string> StoreProfileImage(IFormFile profileImage)
        {

            string uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(profileImage.FileName);
            string filePath = Path.Combine(uploadsPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await profileImage.CopyToAsync(stream);
            }

            return $"/uploads/{fileName}";
        }


        private async Task DeleteUserPhoto(string photoUrl)
        {           
            if (string.IsNullOrEmpty(photoUrl))
            {
                return; // User has no photo to delete
            }

            // Extract filename from photo URL (assuming format "/uploads/fileName.jpg")
            string fileName = Path.GetFileName(photoUrl.TrimStart('/'));

            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", fileName);

            if (System.IO.File.Exists(filePath))
            {
                try
                {
                    await Task.Run(() =>  System.IO.File.Delete(filePath));
                }
                catch (Exception ex)
                {
                    // Handle potential exceptions during file deletion (e.g., log the error)
                    throw new Exception($"Error deleting user photo: {ex.Message}");
                }
            }
        }
    

        [HttpPatch("{nickname}")]
        public async Task<IActionResult> PatchUser(string nickname, User user, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            try
            {
                if (nickname != user?.Nickname)
                {
                    return BadRequest("Nickname in URL does not match the nickname in the request body.");
                }

                var existingUser = await _context.User
                    .Include(u => u.Layout)
                    .Include(u => u.Links)
                    .Include(u => u.Interests)
                    .FirstOrDefaultAsync(u => u.Nickname == nickname);

                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }

                foreach (var property in user.GetType().GetProperties())
                {
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

                return Ok(existingUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request. Details: " + ex.Message);
            }
        }


        [HttpPatch("/api/Photo/{nickname}")]
        public async Task<IActionResult> PatchUser(string nickname, [FromForm] IFormFile profileImage, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            if (profileImage == null || profileImage.Length == 0)
            {
                return BadRequest("No image selected");
            }

            if (!ValidateImage(profileImage)) 
            {
                return BadRequest("Invalid image format");
            }

            try
            {
                var existingUser = await _context.User
                    .FirstOrDefaultAsync(u => u.Nickname == nickname);

                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }


                string oldPhoto = existingUser.Photo;
                
                string imageUrl = await StoreProfileImage(profileImage); 
                existingUser.Photo = imageUrl;
                
                if(oldPhoto != "" && oldPhoto != null){
                    await DeleteUserPhoto(oldPhoto);
                }


                _context.Update(existingUser);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request. Details: " + ex.Message);
            }
        }


        [HttpGet("/api/UserExists/{nickname}")]
        public bool UserExists(string nickname)
        {
            return _context.User.Any(u => u.Nickname == nickname);
        }

        [HttpDelete("{nickname}")]
        public async Task<IActionResult> DeleteAccount(string nickname, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            var user = _context.User.Where(c => c.Nickname == nickname).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }

}