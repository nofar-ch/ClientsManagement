using System.Text.RegularExpressions;

namespace NessOrtClients.Features.Common
{
    public static class Validator
    {

        public static bool ContainSpace(string fullName)
        {
            return fullName.Contains(" ");
        }

        public static bool ContainsOnlyNumbers(string input)
        {
            string pattern = @"^\d+$";
            Regex regex = new Regex(pattern);
            return regex.IsMatch(input);
        }
    }
}
