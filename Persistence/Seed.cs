using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Todos.Any()) return;

            var todos = new List<Todo>
            {
                new() {
                    Name = "Task 1",
                    Description = "Auth Module",
                    Comments = "This is a comment",
                    IsComplete = false,
                },
                new() {
                    Name = "Task 2",
                    Description = "Dashboard UI",
                    Comments = "This is a comment",
                    IsComplete = false,
                },
            };

            await context.Todos.AddRangeAsync(todos);
            await context.SaveChangesAsync();
        }
    }
}