using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using JwtLogin.Data;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace JwtLogin.Controllers
{
    [Route("api/setup")]
    [ApiController]
    public class SetupController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly UserContext _userContext;
        private readonly ILogger<SetupController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;
        public SetupController(UserManager<IdentityUser> userManager, UserContext userContext, ILogger<SetupController> logger, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _logger = logger;
            _userContext = userContext;
            _userManager = userManager;
        }


        // Get All Roles
        [HttpGet]
        [Route("AllRoles")]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }


        //Create  a role by giving Role name
        [HttpPost]
        [Route("CreateRole/{name}")]
        public async Task<IActionResult> CreateRole( string name)
        {

            if (name == null)
                return BadRequest(new { Error = "Null Role cant Be Add" });

            //If a role already Exist
            var existingRole = await _roleManager.RoleExistsAsync(name);
            if (existingRole)
            {
                _logger.LogInformation($"The Role {name} Already Exist");

                return BadRequest(new { Error = "Role Already Exist" });
            }

            //Role has been added successfully
            var roleResult = await _roleManager.CreateAsync(new IdentityRole(name));

            if (roleResult.Succeeded)
            {
                _logger.LogInformation($"The Role {name} has been added Succesfully");
                return Ok(new { result = $"The Role {name} has been added Succesfully" });
            }



            _logger.LogInformation($"The Role {name} has not added ");
            return Ok(new { error = $"The Role {name} has not added" });


        }

        //Delete  a role By Id
        [HttpDelete]
        [Route("DeleteRole/{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            if (id == null)
            {
                return BadRequest(new { Error = "Null Id Error" });
            }
            var role = await _roleManager.Roles.Where(r => r.Id == id.ToString()).FirstOrDefaultAsync();

            if (role != null)
            {
                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                    return Ok(new { Result = $"user Role {role} deleted Succeeded" });
            }
            return BadRequest(new { Error = "Somting Went wrong" });


        }


        // Get all Users Details
        [HttpGet]
        [Route("AllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            var result = await _userManager.Users.ToListAsync();

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(new { error = "No user Found" });
        }

        // Add Role To a User

        [HttpPost]
        [Route("AddRole")]
        public async Task<IActionResult> AddRoleToUser(string userRole, string email)
        {
            //Check for valid userRole and Email
            if (userRole == null || email == null)
                return BadRequest(new {Error = "Invalid User and Role value"});
            
            var role =  await _roleManager.FindByNameAsync(userRole);
            
            //Check Role exist or not
            if(role == null)
            {
                return BadRequest(new { Error = "Invalid Role"});
            }
            var user = await _userManager.FindByEmailAsync(email);


            //Check User Exist or not
            if (user == null)
            {
                return BadRequest(new { Error = $"User already removed from {userRole}"});
            }

            var result = await _userManager.AddToRoleAsync(user, userRole);
            
            //if user role is added successfully
            if (result.Succeeded)
                 return Ok(new { Result = $"{userRole} has been Added to {email} succesfully" });


            return BadRequest(new { Error = $"User already Added to  {userRole}" });

        }


        //Remove user From Role

        [HttpPost]
        [Route("RemoveUserRole")]

        public async Task<IActionResult> RemoveUserFromRole(string userRole,string email)
        {
            if (userRole == null || email == null)
            {
                return BadRequest(new { Errors = "Invalid Email Or user Role" });
            }

            var user = await _userManager.FindByEmailAsync(email);

            //check If user Exist or not

            if (user == null)
                return BadRequest(new { Error = "User Not found" });

            var role = await _roleManager.FindByNameAsync(userRole);

            //Check if role is Exist or not
            if (role == null)
                return BadRequest(new  { Error = "Role not Found" });
            var result = await _userManager.RemoveFromRoleAsync(user, userRole);

            //Check weather user removed from role or not 
            if (result.Succeeded)
                return Ok(new { Result = $"User {email} has been Removed from {userRole} successfully"});

            return BadRequest(new { Error = $"User {email} already Removed From {userRole} role"}); 

        }

       [HttpGet]
       [Route("GetUserRoles")]

       public async Task<IActionResult> GetUseRoles(string email)
        {
            if (email == null)
                return BadRequest(new  { Error = "Invalid Email"});

            //check Weather user is exist or not

            var user =  await _userManager.FindByEmailAsync(email);

            if(user == null)
            {
                return BadRequest(new {Error = "User Not Found"});
            }

            var result = await _userManager.GetRolesAsync(user);

            if (result == null)
                return BadRequest(new { Error = "Somthing Went Wrong"});
            return Ok(new { Result = result});

        }
    }
}
