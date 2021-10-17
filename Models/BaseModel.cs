using System;
using System.ComponentModel.DataAnnotations;

namespace FlightManager.Models
{
    public class BaseModel
    {
        [Key]
        public Guid Id { get; set; }
    }
}