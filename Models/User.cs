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
        // keep roles in order of privilege
        [RegularExpression(@"[a-zA-Z0-9_]{4,16}")]
        public string Username { get; set; }
        [JsonIgnore]
        public string HashedPassword { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
    }
}