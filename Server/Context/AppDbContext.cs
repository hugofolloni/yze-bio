
using Profile.Models;
using Microsoft.EntityFrameworkCore;

namespace Profile.Context;
public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

    }

    public DbSet<Account>? Account { get; set; }
    public DbSet<User>? User { get; set; }
    public DbSet<Layout>? Layout { get; set; }
    public DbSet<ProfileLinks>? ProfileLinks { get; set; }
    public DbSet<Interests>? Interests { get; set; }
    public DbSet<Questions>? Questions { get; set; }
    
    protected override void OnModelCreating(ModelBuilder mb){
        mb.Entity<Account>().HasKey(c => c.Id);
        mb.Entity<Account>().Property(c => c.Username).HasMaxLength(100);
        mb.Entity<Account>().Property(c => c.Password).HasMaxLength(200);
        mb.Entity<Account>().Property(c => c.Email).HasMaxLength(100);
        mb.Entity<Account>().Property(c => c.Confirmed);
        mb.Entity<Account>().HasMany(c => c.Users).WithOne().HasForeignKey(c => c.AccountId);

        mb.Entity<User>().HasKey(c => c.Id);
        mb.Entity<User>().Property(c => c.Nickname).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Title).HasMaxLength(30);
        mb.Entity<User>().Property(c => c.Subtitle).HasMaxLength(100);
        mb.Entity<User>().Property(c => c.Description).HasMaxLength(500);
        mb.Entity<User>().HasOne(c => c.Layout).WithOne().HasForeignKey<Layout>(u => u.UserId).IsRequired(); 
        mb.Entity<User>().HasMany(c => c.Links).WithOne().HasForeignKey(u => u.UserId).IsRequired();
        mb.Entity<User>().HasMany(c => c.Interests).WithOne().HasForeignKey(u => u.UserId).IsRequired();
        mb.Entity<User>().HasMany(c => c.Questions).WithOne().HasForeignKey(u => u.UserId).IsRequired();        

        mb.Entity<Layout>().HasKey(c => c.Id);
        mb.Entity<Layout>().Property(c => c.BorderRadius).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.CardBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.PageBackgroundColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.FontFamily).HasMaxLength(20);
        mb.Entity<Layout>().Property(c => c.FontColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.TitleColor).HasMaxLength(10);
        mb.Entity<Layout>().Property(c => c.BaseLayout).HasMaxLength(40);

        mb.Entity<ProfileLinks>().HasKey(c => c.Id);
        mb.Entity<ProfileLinks>().Property(c => c.Type).HasMaxLength(40);
        mb.Entity<ProfileLinks>().Property(c => c.Value).HasMaxLength(40);

        mb.Entity<Interests>().HasKey(c => c.Id);
        mb.Entity<Interests>().Property(c => c.Interest).HasMaxLength(10);
        mb.Entity<Interests>().Property(c => c.Emoji).HasMaxLength(5);
        
        mb.Entity<Questions>().HasKey(c => c.Id);
        mb.Entity<Questions>().Property(c => c.Question).HasMaxLength(300);
        mb.Entity<Questions>().Property(c => c.Answer).HasMaxLength(300);
        
    }

}

// dotnet ef migrations add NOME
// dotnet ef database update NOME