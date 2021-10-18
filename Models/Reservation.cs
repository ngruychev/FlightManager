using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FlightManager.Models
{
    public class Reservation : BaseModel
    {
        [Required]
        public Guid FlightId { get; set; }
        [JsonIgnore]
        public virtual Flight Flight { get; private set; }
        [Required]
        public virtual List<Passenger> Passengers { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public bool Confirmed { get; set; }
    }
}