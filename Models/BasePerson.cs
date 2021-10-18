using System.ComponentModel.DataAnnotations;

namespace FlightManager.Models
{
    public class BasePerson : BaseModel
    {
        [MinLength(1)]
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [MinLength(1)]
        [Required]
        public string LastName { get; set; }
        // https://en.wikipedia.org/wiki/Unique_citizenship_number
        [Required]
        [RegularExpression(@"^[0-9]{10}$")]
        public string Egn { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}