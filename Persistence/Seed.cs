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
                    Name = "Task 1 for module auth module",
                    Description = "Auth Module",
                    Comments = "This is a comment",
                    IsComplete = false,
                    DueDate = DateTime.Now.AddDays(7),
                },
                new() {
                    Name = "Task 2 for dashboard module",
                    Description = "Dashboard UI",
                    Comments = "This is a comment",
                    IsComplete = false,
                    DueDate = DateTime.Now.AddDays(2),
                },
            };

            await context.Todos.AddRangeAsync(todos);
            await context.SaveChangesAsync();
        }
    }
}