using Microsoft.EntityFrameworkCore;
using Task = Domain.Task;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; }
    }
}