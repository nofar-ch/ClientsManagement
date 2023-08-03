using MediatR;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client
{
    public class DeleteClientCommand : IRequest<BaseResponseDto>
    {
        public string Id { get; set; }
    }
}
