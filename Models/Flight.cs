using System;
using System.ComponentModel.DataAnnotations;

namespace FlightManager.Models
{
    public class Flight : BaseModel
    {
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string PlaneType { get; set; }
        public string PilotName { get; set; }
        public int EconomySeatsCapacity { get; set; }
        public int BusinessSeatsCapacity { get; set; }
    }
}