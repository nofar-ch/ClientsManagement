using MediatR;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client.Create.Queries
{
    public class GetClientQuery : IRequest<IReadOnlyList<ClientDto>>
    {
        public int Page { get; set; }
        public int Size { get; set; }
    }
}
