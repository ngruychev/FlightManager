using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FlightManager.Models
{

    public enum UserRole
    {
        Employee,
        Admin
    }
    public class User : BasePerson
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_]{4,16}$")]
        public string Username { get; set; }
        [JsonIgnore]
        public string HashedPassword { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public UserRole Role { get; set; }
    }
}