using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NessOrtClients.Data;
using NessOrtClients.Dto;

namespace NessOrtClients.Features.Client.Delete.Commands
{
    public class DeleteClientCommandHandler : IRequestHandler<DeleteClientCommand, ResponseContent>
    {
        private DataContext _context;
        private IMapper _mapper;
        public DeleteClientCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponseContent> Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            var existingEntity = await _context.Client.FindAsync(request.Id);

            if (existingEntity == null)
            {
                return new ResponseContent { IsSuccess = false };
            }
            var itemToSave = _mapper.Map(request, existingEntity);
            itemToSave.IsDeleted = true;
            _context.Update(itemToSave);
            await _context.SaveChangesAsync();
            return new ResponseContent { IsSuccess = true };
        }
    }
}
