namespace Profile.Models;

public class User {
    public long Id { get; set; }
    public long? AccountId { get; set;}
    public string Nickname { get; set; } = null!;
    public string? Title { get; set; }
    public string? Subtitle { get; set; }
    public string? Description { get; set; }
    public Layout? Layout { get; set; }
    public ProfileLinks? Links { get; set; }
}