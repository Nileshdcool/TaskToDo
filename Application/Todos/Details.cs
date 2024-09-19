using Domain;
using MediatR;
using Persistence;

namespace Application.Todos
{
    public class Details
    {
        public class Query : IRequest<Todo>
        {
            public Guid Id { get; set; }
        }


        public class Handler(DataContext context) : IRequestHandler<Query, Todo>
        {
            private readonly DataContext _context = context;
            public async Task<Todo> Handle(Query request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Id], cancellationToken: cancellationToken);
                if (todo == null)
                {
                    throw new Exception("Todo not found");
                }
                return todo;
            }
        }
    }
}