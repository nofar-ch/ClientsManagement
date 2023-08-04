using AutoMapper;
using MediatR;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using System.Linq.Expressions;

namespace NessOrtClients.Features.Client.Create.Queries
{
    public class GetClientQueryHandler : IRequestHandler<GetClientQuery, BaseResponseDto<IReadOnlyList<ClientDto>>>
    {
        private DataContext _context;
        private IMapper _mapper;

        public GetClientQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BaseResponseDto<IReadOnlyList<ClientDto>>> Handle(GetClientQuery request, CancellationToken cancellationToken)
        {

            Expression<Func<Entities.Client, bool>> predicate = x => !x.IsDeleted;
            
            if(!string.IsNullOrEmpty(request.Id))
            {
                predicate = predicate.And(x => x.Id.Contains(request.Id));
            }
            if (!string.IsNullOrEmpty(request.FullName))
            {
                predicate = predicate.And(x => x.FullName.Contains(request.FullName));
            }
            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                predicate = predicate.And(x => x.PhoneNumber.Contains(request.PhoneNumber));

            }
            if (!string.IsNullOrEmpty(request.IpAddress))
            {
                predicate = predicate.And(x => x.IpAddress.Contains(request.IpAddress));

            }

            var result = await _context.Client
                .Where(predicate)
                .OrderByDescending(x => x.ModifiedDate)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .AsNoTracking()
                .ToListAsync();

            int count  = _context.Client.Count();

            return new BaseResponseDto<IReadOnlyList<ClientDto>>
            {
                Data = _mapper.Map<IReadOnlyList<ClientDto>>(result),
                TotalCount = count,
                IsSuccess = true
            };
        }
    }
}
