using AutoMapper;
using MediatR;
using NessOrtClients.Entities;
using NessOrtClients.Profiles;
using System.Reflection;

namespace NessOrtClients.Services
{
    public static class AppService
    {
        public static IServiceCollection AppServiceMediator(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddMediatR(Assembly.GetExecutingAssembly());
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

            return services;
        }
    }
}
