using Domain;
using FluentValidation;

namespace Application.Todos
{
    public class TodoValidator : AbstractValidator<Todo>
    {
        public TodoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(10);
            RuleFor(x => x.Comments).MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(100);
            RuleFor(x => x.DueDate).NotEmpty();
        }
    }
}