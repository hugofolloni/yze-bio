namespace Profile.Models;
public class Questions {
    public long Id { get; set; }
    public long UserId {get; set; }
    public string Question { get; set; } = null!;
    public string? Answer { get; set; }
}