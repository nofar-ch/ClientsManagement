using MediatR;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client.Create.Queries
{
    public class GetClientQuery : IRequest<BaseResponseDto<IReadOnlyList<ClientDto>>>
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public string? Id { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? IpAddress { get; set; }


    }
}
