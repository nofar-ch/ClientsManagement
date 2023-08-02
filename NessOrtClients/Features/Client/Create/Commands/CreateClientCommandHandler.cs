using AutoMapper;
using MediatR;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using NessOrtClients.Entities;

namespace NessOrtClients.Features.Client.Create.Commands
{
    public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, BaseResponseDto>
    {
        private DataContext _context;
        private IMapper _mapper;

        public CreateClientCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        protected CreateClientValidator Validator => new CreateClientValidator();

        public async Task<BaseResponseDto> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            var newItem = _mapper.Map<Entities.Client>(request);
            await Task.FromResult(_context.AddAsync(newItem));
            return new BaseResponseDto { IsSuccess = true };
        }

    }
}
