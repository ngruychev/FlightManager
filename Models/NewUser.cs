using System.ComponentModel.DataAnnotations;

namespace FlightManager.Models
{
    public class NewUser : User
    {
        [RegularExpression(@"^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,32}$")]
        [Required]
        public string Password { get; set; }
    }
}