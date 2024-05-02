
using Profile.Models;
using Microsoft.EntityFrameworkCore;

namespace Profile.Context;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

    }

    public DbSet<Layout>? Layout { get; set; }
    public DbSet<User>? User { get; set; }
    
    protected override void OnModelCreating(ModelBuilder mb){
        mb.Entity<Layout>().HasKey(c => c.Id);
        mb.Entity<Layout>().Property(c => c.BorderRadius).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.CardBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.PageBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.FontFamily).HasMaxLength(20);
        mb.Entity<Layout>().Property(c => c.FontColor).HasMaxLength(10);

        mb.Entity<User>().HasKey(c => c.Id);
        mb.Entity<User>().Property(c => c.Nickname).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Title).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Subtitle).HasMaxLength(100);
        mb.Entity<User>().Property(c => c.Description).HasMaxLength(500);
        mb.Entity<User>().HasOne(c => c.Layout).WithOne().HasForeignKey<Layout>(u => u.UserId); // It creates at the Layout table a FK referencing the User.Id
    }


}

// dotnet ef migrations add NOME
// dotnet ef database update NOME