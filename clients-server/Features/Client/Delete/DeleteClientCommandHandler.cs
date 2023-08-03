using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NessOrtClients.Data;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client.Delete.Commands
{
    public class DeleteClientCommandHandler : IRequestHandler<DeleteClientCommand, BaseResponseDto>
    {
        private DataContext _context;
        private IMapper _mapper;
        public DeleteClientCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BaseResponseDto> Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            var existingEntity = await _context.Client.FindAsync(request.Id);

            if (existingEntity == null)
            {
                return new BaseResponseDto { IsSuccess = false };
            }
            var itemToSave = _mapper.Map(request, existingEntity);
            itemToSave.IsDeleted = true;
            await Task.FromResult(_context.Update(itemToSave));
            return new BaseResponseDto { IsSuccess = true };
        }

    }
}
