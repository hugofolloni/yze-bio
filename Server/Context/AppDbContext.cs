
using Profile.Models;
using Microsoft.EntityFrameworkCore;

namespace Profile.Context;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

    }

    public DbSet<Layout>? Layout { get; set; }
    
    protected override void OnModelCreating(ModelBuilder mb){
        mb.Entity<Layout>().HasKey(c => c.Id);
        mb.Entity<Layout>().Property(c => c.BorderRadius).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.BackgroundColor).HasMaxLength(10);
    }
}
