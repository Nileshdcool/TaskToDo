using Domain;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.Todos
{
    public class Details
    {
        public class Query : IRequest<Result<Todo>>
        {
            public Guid Id { get; set; }
        }


        public class Handler(DataContext context) : IRequestHandler<Query, Result<Todo>>
        {
            private readonly DataContext _context = context;
            public async Task<Result<Todo>> Handle(Query request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Id], cancellationToken: cancellationToken) ?? throw new Exception("Todo not found");
                return Result<Todo>.Success(todo);
            }

        }
    }
}