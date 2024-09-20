using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Todos
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<Todo>>>
        { 
            public TodoParams Params { get; set; }
        };

        public class Handler(DataContext context) : IRequestHandler<Query, Result<PagedList<Todo>>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<PagedList<Todo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Todos.AsQueryable();
                return Result<PagedList<Todo>>.Success(
                    await PagedList<Todo>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}