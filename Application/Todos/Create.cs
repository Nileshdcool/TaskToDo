using MediatR;
using Domain;
using Persistence;
using FluentValidation;
using System.Data;
using Application.Core;

namespace Application.Todos
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Todo Todo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator() 
            {
                RuleFor(x => x.Todo).SetValidator(new TodoValidator());
            }
        }

        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Todos.Add(request.Todo);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<Unit>.Failure(Messages.FAILED_TO_CREATE_ACTIVITY);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}