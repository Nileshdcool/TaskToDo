using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<Todo> Todos { get; set; }
    }
}