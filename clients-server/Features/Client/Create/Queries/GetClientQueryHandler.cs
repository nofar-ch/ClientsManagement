using AutoMapper;
using MediatR;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using Microsoft.Extensions.DependencyInjection;

namespace NessOrtClients.Features.Client.Create.Queries
{
    public class GetClientQueryHandler : IRequestHandler<GetClientQuery, IReadOnlyList<ClientDto>>
    {
        private DataContext _context;
        private IMapper _mapper;

        public GetClientQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ClientDto>> Handle(GetClientQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Client
                .Skip(request.Page)
                .Take(request.Size)
                .Where(x => !x.IsDeleted)
                .ToListAsync();
           return _mapper.Map<List<ClientDto>>(result);
        }

    }
}
