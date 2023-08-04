using FluentValidation;
using NessOrtClients.Features.Common;

namespace NessOrtClients.Features.Client.Create.Commands
{
    public class CreateClientValidator : AbstractValidator<CreateClientCommand>
    {
        public CreateClientValidator()
        {
            // Id
            RuleFor(client => client.Id).NotEmpty();
            RuleFor(client => client.Id).Length(10);
            RuleFor(client => client.PhoneNumber).Must(Validator.ContainsOnlyNumbers).WithMessage("The Id must contain only number.");

            // FullName
            RuleFor(client => client.FullName).NotEmpty();
            RuleFor(client => client.FullName).Must(Validator.ContainSpace).WithMessage("The FullName must contain a full name.");

            // PhoneNumber
            RuleFor(client => client.PhoneNumber).NotEmpty();
            RuleFor(client => client.PhoneNumber).MinimumLength(9);
            RuleFor(client => client.PhoneNumber).MaximumLength(10);
            RuleFor(client => client.PhoneNumber).Must(Validator.ContainsOnlyNumbers).WithMessage("The PhoneNumber must contain only number.");

            //IpAddress
            RuleFor(client => client.IpAddress).NotEmpty();
            RuleFor(client => client.IpAddress).NotEmpty()
                   .Matches(@"^\b(?:\d{1,3}\.){3}\d{1,3}\b$").WithMessage("Invalid IP Address.");

        }
    }
}
