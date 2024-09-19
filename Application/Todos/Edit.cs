using Domain;
using MediatR;
using Persistence;

namespace Application.Todos
{
    public class Edit
    {
        public class Command : IRequest<Todo>
        {
            public required Todo Todo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Todo>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Todo> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Todo.Id], cancellationToken: cancellationToken);
                if (todo == null)
                {
                    throw new Exception("Todo not found");
                }

                todo.Name = request.Todo.Name;
                todo.Description = request.Todo.Description;
                todo.Comments = request.Todo.Comments;
                todo.IsComplete = request.Todo.IsComplete;

                await _context.SaveChangesAsync(cancellationToken);

                return todo;
            }
        }
    }
}