
using Profile.Models;
using Microsoft.EntityFrameworkCore;

namespace Profile.Context;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

    }

    public DbSet<Layout>? Layout { get; set; }
    public DbSet<User>? User { get; set; }
    public DbSet<ProfileLinks>? ProfileLinks { get; set; }
    
    protected override void OnModelCreating(ModelBuilder mb){
        mb.Entity<User>().HasKey(c => c.Id);
        mb.Entity<User>().Property(c => c.Nickname).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Title).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Subtitle).HasMaxLength(100);
        mb.Entity<User>().Property(c => c.Description).HasMaxLength(500);
        mb.Entity<User>().HasOne(c => c.Layout).WithOne().HasForeignKey<Layout>(u => u.UserId).IsRequired(); // It creates at the Layout table a FK referencing the User.Id
        mb.Entity<User>().HasOne(c => c.Links).WithOne().HasForeignKey<ProfileLinks>(u => u.UserId).IsRequired();

        mb.Entity<Layout>().HasKey(c => c.Id);
        mb.Entity<Layout>().Property(c => c.BorderRadius).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.CardBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.PageBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.FontFamily).HasMaxLength(20);
        mb.Entity<Layout>().Property(c => c.FontColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.TitleColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.BaseLayout).HasMaxLength(40);

        mb.Entity<ProfileLinks>().HasKey(c => c.Id);
        mb.Entity<ProfileLinks>().Property(c => c.Github).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.Instagram).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.Twitter).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.LastFm).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.Spotify).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.Lettebocd).HasMaxLength(40);

    }


}

// dotnet ef migrations add NOME
// dotnet ef database update NOME