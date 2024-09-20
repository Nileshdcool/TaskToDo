namespace Domain
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Comments { get; set; }
        public bool? IsComplete { get; set; }
        public DateTime? DueDate { get; set; }
    }
}