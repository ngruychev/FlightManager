namespace FlightManager.Models
{
    public enum TicketType
    {
        Economy,
        Business
    }
    public class Reservation : BasePerson
    {
        public Flight Flight { get; set; }
        public string Nationality { get; set; }
        public TicketType TicketType { get; set; }
    }
}