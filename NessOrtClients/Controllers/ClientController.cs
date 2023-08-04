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
        public async Task<ActionResult<BaseResponseDto<ClientDto>>> GetClients(int page, int size,
         string? filterId = null,
         string? filterFullName = null,
         string? filterPhoneNumber = null,
         string? filterIpAddress = null)
        {
            var response = await _mediator.Send(new GetClientQuery
            {
                Page = page,
                Size = size,
                Id = filterId,
                FullName = filterFullName,
                PhoneNumber = filterPhoneNumber,
                IpAddress = filterIpAddress
            });
            return Ok(response);
        }

        [HttpPost("AddClient", Name = "AddClient")]
        public async Task<ActionResult<ResponseContent>> AddClients([FromBody] CreateClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpPut("UpdateClient", Name = "UpdateClient")]
        public async Task<ActionResult<ResponseContent>> UpdateClient([FromBody] UpdateClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }

        [HttpDelete("DeleteClient", Name = "DeleteClient")]
        public async Task<ActionResult<ResponseContent>> DeleteClient([FromBody] DeleteClientCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
