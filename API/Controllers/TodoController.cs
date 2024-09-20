using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Todos;

namespace API.Controllers
{
    public class TodoController() : BaseApiController
    {

        [HttpGet]  // GET /api/todo
        public async Task<IActionResult> GetTodos([FromQuery] TodoParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]  // GET /api/todo/{id}
        public async Task<IActionResult> GetTodo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]  // POST /api/todo
        public async Task<IActionResult> CreateTodo(Todo todo)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Todo = todo }));
        }

        [HttpPut("{id}")]  // PUT /api/todo/{id}
        public async Task<IActionResult> EditTodo(Guid id, Todo todo)
        {
            todo.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Todo = todo }));
        }

        [HttpDelete("{id}")]  // DELETE /api/todo/{id}
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}