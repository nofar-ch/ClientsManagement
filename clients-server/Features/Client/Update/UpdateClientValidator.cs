using FluentValidation;

namespace NessOrtClients.Features.Client.Create.Commands
{
    public class UpdateClientValidator : AbstractValidator<UpdateClientCommand>
    {
        public UpdateClientValidator()
        {
            RuleFor(client => client.Id).NotEmpty();
            RuleFor(client => client.FullName).NotEmpty();
            RuleFor(client => client.PhoneNumber).NotEmpty();
            RuleFor(client => client.IpAddress).NotEmpty();
        }

    }
}
