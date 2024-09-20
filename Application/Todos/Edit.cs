using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Todos
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Todo Todo { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Todo).SetValidator(new TodoValidator());
            }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.FindAsync([request.Todo.Id], cancellationToken: cancellationToken) ?? throw new Exception("Todo not found");
                _mapper.Map(request.Todo, todo);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!result) return Result<Unit>.Failure(Messages.FAILED_TO_UPDATE_ACTIVITY);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}