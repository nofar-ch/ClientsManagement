using MediatR;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client
{
    public class DeleteClientCommand : IRequest<ResponseContent>
    {
        public string Id { get; set; }
    }
}
