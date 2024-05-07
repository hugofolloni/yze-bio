namespace Profile.Models;

public class User {
    public long Id { get; set; }
    public long? AccountId { get; set;}
    public string Nickname { get; set; } = null!;
    public string? Photo { get; set; }
    public string? Title { get; set; }
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public string? Pronouns { get; set; }
    public string? Song { get; set; }
    public string? Gif { get; set; }
    public Layout? Layout { get; set; }
    public ICollection<ProfileLinks>? Links { get; set; }
    public ICollection<Questions>? Questions { get; set; }
    public ICollection<Interests>? Interests { get; set; }

}