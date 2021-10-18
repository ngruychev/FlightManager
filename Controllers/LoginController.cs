using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FlightManager.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace FlightManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FlightManagerContext _context;
        public LoginController(FlightManagerContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<User> LoginInfo()
        {
            try
            {
                Guid id = new Guid(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
                return _context.Users.Where(u => u.Id == id).First();
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> Login(Login login)
        {
            User user;
            try
            {
                user = _context.Users.Where(u => u.Username == login.Username).First();
            }
            catch (InvalidOperationException)
            {
                return Unauthorized();
            }
            bool loggedIn = BCrypt.Net.BCrypt.Verify(login.Password, user.HashedPassword);
            if (!loggedIn) return Unauthorized();
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties();
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
            return user;
        }

        [HttpDelete]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}