namespace Profile.Models;

public class Layout {
    public long Id { get; set; }
    public long UserId {get; set; }
    public string? BorderRadius { get; set; }
    public string? CardBackgroundColor { get; set; }
    public string? PageBackgroundColor { get; set; }
    public string? FontFamily { get; set; }
    public string? FontColor { get; set; }
    public string? TitleColor { get; set; }
    public string? BaseLayout { get; set; }

}