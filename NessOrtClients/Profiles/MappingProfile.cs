using AutoMapper;
using NessOrtClients.Dto;
using NessOrtClients.Entities;
using NessOrtClients.Features.Client;
using NessOrtClients.Features.Client.Create.Commands;

namespace NessOrtClients.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {

            CreateMap<Client, ClientDto>();
            CreateMap<CreateClientCommand, Client>();
            CreateMap<UpdateClientCommand, Client>();
            CreateMap<DeleteClientCommand, Client>();

        }

    }
}
