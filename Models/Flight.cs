using System.ComponentModel.DataAnnotations;
using System;
using System.Linq;
using System.Collections.Generic;

namespace FlightManager.Models
{
    public class Flight : BaseModel
    {
        public Flight()
        {
            Reservations = new List<Reservation>();
        }
        [Required]
        [MinLength(1)]
        public string LocationFrom { get; set; }
        [MinLength(1)]
        [Required]
        public string LocationTo { get; set; }
        [Required]
        public DateTime DepartureTime { get; set; }
        [Required]
        public DateTime ArrivalTime { get; set; }
        [Required]
        [MinLength(1)]
        public string PlaneType { get; set; }
        [MinLength(1)]
        [Required]
        public string PilotName { get; set; }
        public virtual List<Reservation> Reservations { get; private set; }
        [Required]
        public int EconomySeatsCapacity { get; set; }
        [Required]
        public int BusinessSeatsCapacity { get; set; }
        public int EconomySeatsTaken => Reservations.SelectMany(r => r.Passengers.Where(p => p.TicketType == TicketType.Economy)).Count();
        public int BusinessSeatsTaken => Reservations.SelectMany(r => r.Passengers.Where(p => p.TicketType == TicketType.Business)).Count();
        public int EconomySeatsLeft => EconomySeatsCapacity - EconomySeatsTaken;
        public int BusinessSeatsLeft => BusinessSeatsCapacity - BusinessSeatsTaken;
    }
}