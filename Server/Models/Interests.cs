namespace Profile.Models;
public class Interests {
    public long Id { get; set; }
    public long UserId {get; set; }
    public string Interest { get; set; } = null!;
    public string? Emoji { get; set; }
}