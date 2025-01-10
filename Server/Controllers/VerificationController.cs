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
using Server.Utils;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerificationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string _ApiKey;

        private bool IsValidApiKey(string key)
        {
            return key == _ApiKey;
        }

        public VerificationController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _ApiKey = configuration["ApiSettings:ApiKey"];
        }

        // GET: api/Verification/5
        [HttpGet]
        public async Task<ActionResult<Account>> GetAccount([FromQuery] string username, [FromQuery] string hash, [FromQuery] string key)
        {
            if (!IsValidApiKey(key))
            {
                return Unauthorized("Wrong key");
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

            if (!hash.Equals(Utils.Utils.CreateKey(username, userWithLayout.Password))) {
                return Unauthorized(new { Message = "Incorrect hash." });
            }

            return Ok(new { Message = "Correct hash."});
        }

    }
}
