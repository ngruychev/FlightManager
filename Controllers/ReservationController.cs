using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightManager.Models;
using Microsoft.AspNetCore.Authorization;

namespace FlightManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly FlightManagerContext _context;

        public ReservationController(FlightManagerContext context)
        {
            _context = context;
        }

        // GET: api/Reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(Guid id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(Guid id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reservation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            reservation.Id = new Guid();
            reservation.Confirmed = false;
            foreach (var p in reservation.Passengers)
            {
                p.Id = new Guid();
            }
            if (!_context.Flights.Any(f => f.Id == reservation.FlightId)) return NotFound();
            var flight = _context.Flights.Where(f => f.Id == reservation.FlightId).First();
            var economySeatsRequested = reservation.Passengers
                .Where(p => p.TicketType == TicketType.Economy)
                .Count();
            var businessSeatsRequested = reservation.Passengers
                .Where(p => p.TicketType == TicketType.Business)
                .Count();
            if (flight.EconomySeatsLeft < economySeatsRequested || flight.BusinessSeatsLeft < businessSeatsRequested) return BadRequest(new { Error = "not enough places" });
            // TODO: confirmation email
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        // DELETE: api/Reservation/5
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(Guid id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(Guid id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }
    }
}
