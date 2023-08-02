using MediatR;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client
{
    public class UpdateClientCommand : IRequest<BaseResponseDto>
    {
        public string? Id { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? IpAddress { get; set; }
    }
}
