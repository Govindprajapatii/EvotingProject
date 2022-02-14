using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using JwtLogin.Data;
using JwtLogin.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections;
using EVotingApi.Models.DTOs.Request;

namespace JwtLogin.Controllers
{
    [Route("api/Users")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserAuthController : ControllerBase
    {
        private readonly UserContext _userContext;
   
    public UserAuthController(
        UserContext userContext
        )
    {
            _userContext = userContext;
            
    }






        [HttpGet]
        [Route("AdminCountList")]
        public  IEnumerable<int> GetAdminCountList()
        {

           
            var UserCount =  _userContext.GP_Users.Count(x => x.Role == "Admin");
            var ActiveUserCount = _userContext.GP_Users.Count(x => x.Role == "Admin" && x.Status == "Active");
            return new List<int>{ UserCount, ActiveUserCount };
        }



        [HttpGet]
        [Route("AdminsList")]

        public IEnumerable GetAdminsList()
        {

            var UsersList = _userContext.GP_Users.Where(x => x.Role == "Admin");
            return UsersList;
        }


        [HttpPost]
        [Route("UpdateAdminStatus")]

        public bool UpdateAdminStatus([FromBody] StatusUpdateRequest statusUpdateRequest)
        {
            try
            {

             var user = this._userContext.GP_Users.Where(x => x.UserId == statusUpdateRequest.Id).FirstOrDefault();
            if(user != null)
            {

            user.Status = statusUpdateRequest.Status;
                    _userContext.SaveChanges();
                return true;
            }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            return false;
            }
            return false;
        }



        [HttpGet]
        [Route("GetAll")]

        public IEnumerable<User> GetAll()
        {
            try
            {
                var result = _userContext.GP_Users.ToList<User>();
                return result;
            }
            catch(Exception error)
            {
                
                return  null ;
            }
        }

        [HttpPost]
        [Route("Create")]

        public IActionResult CreateUser([FromBody] User user)
        {

             try
            {
                var isCreated =   _userContext.GP_Users.AddAsync(user);
                _userContext.SaveChanges();
                return Ok(new { result ="User Cerated Success"});
            }catch(Exception ex) {
            
                return BadRequest(ex);
             }
        }

        [HttpGet]
        [Route("GetById/{id}")]

        public IActionResult GetById(int id)
        {
            var data = _userContext.GP_Users.Where(x => x.UserId == id).FirstOrDefault();
            return Ok(data);
        }


        [HttpPut]
        [Route("Edit/{Id}")]

        public IActionResult Edit(int id,[FromForm] User user)
        {
            try
            {
                if(id == user.UserId)
                {
                    var result = _userContext.GP_Users.Update(user);
                    _userContext.SaveChanges();
                    if (result!=null)
                    {
                        return Ok("Updation Success");
                    }
                    else
                    {
                        return Ok(new { error = "Somting Went Wrong"});
                    }
                }
                return BadRequest();
            }
            catch(Exception error)
            {
                return BadRequest(new { error = error});
            }
        }

        [HttpDelete]
        [Route("Delete/{Id}")]
        public IActionResult Delete(int id){
            try
            {
                var data = _userContext.GP_Users.Where(x => x.UserId == id).FirstOrDefault();
                var result = _userContext.GP_Users.Remove(data);
                _userContext.SaveChanges();
                if (result != null)
                {
                    return Ok(new { result = "Deleted Successful" });
                }
            }catch(Exception error)
            {
               return  BadRequest(new { error = error });
            }
            return BadRequest();
        }
        [HttpPatch]
        [Route("UpdateStatus/{Id}")]
        public IActionResult UpdateStaus(int id,[FromForm] User user)
        {
            try
            {

            var data = _userContext.GP_Users.Where(x => x.UserId == id).FirstOrDefault();
            _userContext.SaveChanges();
                return Ok(new { result = "Status Updated Successfully"});
            }
            catch(Exception error)
            {

            return BadRequest(new { result = "Updation Falid" });
            }
        }

    }
}
