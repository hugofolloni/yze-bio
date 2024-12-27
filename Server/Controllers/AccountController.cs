using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profile.Context;
using Profile.Models;
using Microsoft.Extensions.Configuration;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _ApiKey;

        private bool IsValidApiKey(string key)
        {
            return key == _ApiKey;
        }

        public AccountController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;

    // Puxa a chave da configuração
            _ApiKey = configuration["ApiSettings:ApiKey"];
        }

        // GET: api/Account/5
        [HttpGet("/api/Projects/{username}")]
        public async Task<ActionResult<Account>> GetAccount(string username, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            var result = _context.Account.Where(c => c.Username == username).Include(c => c.Users).ThenInclude(u => u.Layout).FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("/api/Login/{username}", Name = "Login")]
        public ActionResult GetAccountByUsername(string username, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            var result = from account in _context.Account
                            where account.Username == username
                            select new
                            {
                               account.Id, account.Username, account.Password
                            };

            var userWithLayout = result.FirstOrDefault();

            if (userWithLayout == null)
            {
                return NotFound();
            }

            return Ok(userWithLayout);
        }

        [HttpGet("/api/AccountExists/{username},{email}")]
        public bool UserExists(string username, string email)
        {
            return _context.Account.Any(u => u.Username == username) || _context.Account.Any(u => u.Email == email);
        }

        // PUT: api/Account/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(long id, Account account, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // GET: api/Account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccount([FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }
            return await _context.Account.ToListAsync();
        }

        // POST: api/Account
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            _context.Account.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Id }, account);
        }

        // DELETE: api/Account/5
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteAccount(string username, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }

            var account = _context.Account.Where(c => c.Username == username).FirstOrDefault();

            if (account == null)
            {
                return NotFound();
            }

            _context.Account.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("/api/Account/GetId/{username}")]
        public async Task<ActionResult<long>> GetId(string username, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Chave errada");
            }
            
            var result = _context.Account.Where(c => c.Username == username).FirstOrDefault();
            
            if (result == null)
            {
                return -1;
            }

            return result.Id;
        }

        private bool AccountExists(long id)
        {
            return _context.Account.Any(e => e.Id == id);
        }
    }
}
