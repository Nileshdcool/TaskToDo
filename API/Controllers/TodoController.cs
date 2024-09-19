using Microsoft.AspNetCore.Mvc;
using Domain;
using MediatR;
using Application.Todos;

namespace API.Controllers
{
    public class TodoController() : BaseApiController
    {

        [HttpGet]  // GET /api/todo
        public async Task<ActionResult<List<Todo>>> GetTodos()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]  // GET /api/todo/{id}
        public async Task<ActionResult<Todo>> GetTodo(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]  // POST /api/todo
        public async Task<IActionResult> CreateTodo(Todo todo)
        {
            await Mediator.Send(new Create.Command { Todo = todo });
            return Ok();
        }

        [HttpPut("{id}")]  // PUT /api/todo/{id}
        public async Task<ActionResult<Todo>> EditTodo(Guid id, Todo todo)
        {
            todo.Id = id;
            return await Mediator.Send(new Edit.Command { Todo = todo });
        }

        [HttpDelete("{id}")]  // DELETE /api/todo/{id}
        public async Task<ActionResult<Unit>> DeleteTodo(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });
            return Ok();
        }

    }
}