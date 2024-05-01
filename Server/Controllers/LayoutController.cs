using System;
using System.Collections.Generic;
using System.Linq;
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
    public class LayoutController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LayoutController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Layout
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Layout>>> GetLayout()
        {
            return await _context.Layout.ToListAsync();
        }

        // GET: api/Layout/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Layout>> GetLayout(long id)
        {
            var layout = await _context.Layout.FindAsync(id);

            if (layout == null)
            {
                return NotFound();
            }

            return layout;
        }

        // PUT: api/Layout/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLayout(long id, Layout layout)
        {
            if (id != layout.Id)
            {
                return BadRequest();
            }

            _context.Entry(layout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LayoutExists(id))
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

        // POST: api/Layout
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Layout>> PostLayout(Layout layout)
        {
            _context.Layout.Add(layout);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLayout), new { id = layout.Id }, layout);
        }

        // DELETE: api/Layout/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLayout(long id)
        {
            var layout = await _context.Layout.FindAsync(id);
            if (layout == null)
            {
                return NotFound();
            }

            _context.Layout.Remove(layout);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LayoutExists(long id)
        {
            return _context.Layout.Any(e => e.Id == id);
        }
    }
}
