using MediatR;
using Domain;
using Persistence;
using FluentValidation;
using System.Data;

namespace Application.Todos
{
    public class Create
    {
        public class Command : IRequest
        {
            public required Todo Todo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Todo> {
            public CommandValidator() {
                RuleFor(x => x.Name).NotEmpty().MinimumLength(10);
                RuleFor(x => x.Comments).MaximumLength(100);
                RuleFor(x => x.Description).NotEmpty().MaximumLength(100);
            }
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