namespace Profile.Models;

public class Account {
    public long Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Email { get; set; }
    public bool Confirmed { get; set; } = true;
    public ICollection<User>? Users { get; set; }
}