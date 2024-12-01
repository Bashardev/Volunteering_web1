using Microsoft.AspNetCore.Mvc;
using volunteer_web.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class RegisterController : ControllerBase
{
    private readonly DbMydataContext _context;

    public RegisterController(DbMydataContext context)
    {
        _context = context;
    }

    [HttpGet("firstname")]
    public IActionResult GetEmailsByFname([FromQuery] string fname)
    {
        if (string.IsNullOrEmpty(fname))
        {
            return BadRequest("fname parameter is required.");
        }




        var emails = _context.Register
                             .Where(r => r.firstName == fname) // Assuming `Fname` is a string
                             .Select(r => r.email)
                             .ToList();


       

        return Ok(emails); // Return the result as JSON
    }

    [HttpPost("addnew")]
    public IActionResult AddUser([FromBody] UserModel user)
    {
        if (user == null || string.IsNullOrEmpty(user.firstName) || string.IsNullOrEmpty(user.email) || string.IsNullOrEmpty(user.password))
        {
            return BadRequest("Invalid user data.");
        }

        try
        {
            UserModel newUser = new UserModel
            {
                
                firstName = user.firstName,
                familyName = user.familyName,
                email = user.email,
                password = user.password
            };

            _context.Register.Add(newUser);
            _context.SaveChanges();

            return CreatedAtAction(nameof(AddUser), new { id = newUser.id }, newUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        if (string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
        {
            return BadRequest(new { message = "Email and password are required." });
        }

        var user = _context.Register
            .FirstOrDefault(u => u.email == login.Email && u.password == login.Password);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return Ok(new
        {
            user = new
            {
                user.id,
                user.firstName,
                user.familyName,
                user.email
            }
        });
    }



}
