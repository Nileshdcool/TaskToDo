using MediatR;
using Persistence;

namespace Application.Todos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Id], cancellationToken: cancellationToken) ?? throw new Exception("Todo not found");
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}