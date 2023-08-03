using MediatR;
using Microsoft.AspNetCore.Mvc;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using NessOrtClients.Features.Client;
using NessOrtClients.Features.Client.Create.Commands;
using NessOrtClients.Features.Client.Create.Queries;
using System.Drawing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace NessOrtClients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;

        public ClientController(DataContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<ClientDto>> GetClients(int page, int size)
        {
            var response = await _mediator.Send(new GetClientQuery { Page = page, Size = size });
            return Ok(response);
        }

        [HttpPost("AddClient", Name = "AddClient")]
        public async Task<ActionResult<BaseResponseDto>> AddClients([FromBody] CreateClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpPost("UpdateClient", Name = "UpdateClient")]
        public async Task<ActionResult<BaseResponseDto>> UpdateClients([FromBody] UpdateClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpPost("DeleteClient", Name = "DeleteClient")]
        public async Task<ActionResult<BaseResponseDto>> DeleteClients([FromBody] DeleteClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
