using AutoMapper;
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

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Todo>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task<Todo> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Todo.Id], cancellationToken: cancellationToken) ?? throw new Exception("Todo not found");
                _mapper.Map(request.Todo, todo);
                await _context.SaveChangesAsync(cancellationToken);
                return todo;
            }
        }
    }
}