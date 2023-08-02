using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using NessOrtClients.Features.Client.Create.Commands;

namespace NessOrtClients.Features.Client.Update.Commands
{
    public class UpdateClientCommandHandler : IRequestHandler<UpdateClientCommand, BaseResponseDto>
    {
        private DataContext _context;
        private IMapper _mapper;
        public UpdateClientCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;    
        }

        protected UpdateClientValidator Validator => new UpdateClientValidator();

        public async Task<BaseResponseDto> Handle(UpdateClientCommand request, CancellationToken cancellationToken)
        {
            var existingEntity = await _context.Client.FindAsync(request.Id);

            if (existingEntity == null)
            {
                return new BaseResponseDto { IsSuccess = false };
            }
            var itemToSave = _mapper.Map(request, existingEntity);
            await Task.FromResult(_context.Update(itemToSave));

            return new BaseResponseDto { IsSuccess = true };
        }
    }
}
