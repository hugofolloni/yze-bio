namespace Profile.Models;

public class ProfileLinks {
    public long Id { get; set; }
    public long UserId {get; set; }
    public string? Github { get; set; }
    public string? Instagram { get; set; }
    public string? Twitter { get; set; }
    public string? LastFm { get; set; }
    public string? Spotify { get; set; }
    public string? Lettebocd { get; set; }
}