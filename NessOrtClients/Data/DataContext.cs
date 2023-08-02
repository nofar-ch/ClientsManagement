using NessOrtClients.Entities;
using NessOrtClients.Features.Client.Create.Commands;

namespace NessOrtClients.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
            
        }

        public DbSet<Client> Client { get; set; }

    }
}
