using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Task
    {   
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public required string Description { get; set; }

        public string? Comments { get; set; }

        public bool? IsComplete { get; set; }
    }
}