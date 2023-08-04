using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using NessOrtClients.Data;
using NessOrtClients.Dto;
using NessOrtClients.Entities;

namespace NessOrtClients.Features.Client.Create.Commands
{
    public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, ResponseContent>
    {
        private DataContext _context;
        private IMapper _mapper;

        public CreateClientCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        protected CreateClientValidator Validator => new CreateClientValidator();

        public async Task<ResponseContent> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            var newItem = _mapper.Map<Entities.Client>(request);
            newItem.ModifiedDate = DateTime.Now;
            await _context.AddAsync(newItem);
            await _context.SaveChangesAsync();
            return new ResponseContent { IsSuccess = true };
        }

    }
}
