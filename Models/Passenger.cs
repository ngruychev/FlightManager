using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FlightManager.Models
{
    public enum TicketType
    {
        Economy,
        Business
    }
    public class Passenger : BasePerson
    {
        [JsonIgnore]
        public virtual Reservation Reservation { get; set; }
        [MinLength(2)]
        [Required]
        public string Nationality { get; set; }
        [Required]
        public TicketType TicketType { get; set; }
    }
}