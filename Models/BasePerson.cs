using System.ComponentModel.DataAnnotations;

namespace FlightManager.Models
{
    public class BasePerson : BaseModel
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        // https://en.wikipedia.org/wiki/Unique_citizenship_number
        [RegularExpression(@"[0-9]{10}")]
        public string Egn { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}