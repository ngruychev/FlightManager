using System;
using Microsoft.EntityFrameworkCore;

namespace FlightManager.Models
{
    public class FlightManagerContext : DbContext
    {
        public FlightManagerContext(DbContextOptions<FlightManagerContext> options) : base(options) { }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = Guid.NewGuid(),
                Username = "admin",
                Role = UserRole.Admin,
                Address = "N/A",
                Egn = "0000000000",
                Email = "admin@example.com",
                FirstName = "Admin",
                MiddleName = "Adminman",
                LastName = "Adminson",
                PhoneNumber = "123 456-7890", // lol
                HashedPassword = BCrypt.Net.BCrypt.HashPassword("admin") // change that on 1st login
            });
        }
    }
}