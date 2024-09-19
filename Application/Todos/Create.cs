using MediatR;
using Domain;
using Persistence;

namespace Application.Todos
{
    public class Create
    {
        public class Command : IRequest
        {
            public required Todo Todo { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Todos.Add(request.Todo);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}