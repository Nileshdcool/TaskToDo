using Application.Core;
using MediatR;
using Persistence;

namespace Application.Todos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Id], cancellationToken: cancellationToken) ?? throw new Exception("Todo not found");
                _context.Todos.Remove(todo);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete the activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}