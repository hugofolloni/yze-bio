namespace Profile.Models;

public class ProfileLinks {
    public long Id { get; set; }
    public long UserId { get; set; }

    public string Type { get; set; } = null!;

    public string Value { get; set; } = null!;
    public string Action { get; set; } = null!;
}