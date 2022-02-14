using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using JwtLogin.Data;
using JwtLogin.Models.DTOs.Request;
using JwtLogin.Models.DTOs.Response;
using Microsoft.EntityFrameworkCore;
using JwtLogin.Configuration;
using JwtLogin.Models;
using EVotingApi.Models.DTOs.Request;

namespace JwtLogin.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        private readonly TokenValidationParameters _tokenValidatorParameter ;
        private readonly UserContext _userContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthController(
            UserManager<IdentityUser> userManager,
            IOptionsMonitor<JwtConfig> Ioption,
            TokenValidationParameters tokenValidatorParameter,
            UserContext userContext,
            RoleManager<IdentityRole> roleManager
            )
        {
            _userManager = userManager;
            _jwtConfig = Ioption.CurrentValue;
            _tokenValidatorParameter = tokenValidatorParameter;
            _userContext = userContext;
            _roleManager = roleManager;
        }


        //Register Endpoint
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] User UserData)
        {

            UserRegistrationDto user = new UserRegistrationDto() {

                UserName = UserData.FirstName + UserData.LastName,
                Email = UserData.Email,
                Password = UserData.Password
            };
            if (ModelState.IsValid)
            {
                //Check user is already exist or not

                var existingUser = await _userManager.FindByEmailAsync(user.Email);

                if(existingUser != null)    //Email already Exist
                {
                    return BadRequest(new UserRegistrationResponse() { 
                    Errors = new List<String>()
                    {
                        "Email Already Exist"
                    },
                    isSuccess = false
                    });
                }
                else  // Email Does Not exist
                {
                    var newUser = new IdentityUser() { Email = user.Email, UserName = user.UserName };
                    var isCreated = await _userManager.CreateAsync(newUser,user.Password);
                    if(isCreated.Succeeded)
                    {
                        var res  =   await AddRoleToUser(UserData.Role,newUser.Email);
                        var token = await GenerateJwtToken(newUser);
                        
                        UserData.RegistrationDate = DateTime.UtcNow.Date;
                        UserData.Status = "Panding";
                        UserData.IsDeleted = false;
                        UserData.Role = UserData.Role;
                        await _userContext.GP_Users.AddAsync(UserData);
                       
                        _userContext.SaveChanges();
                        return Ok(token);


                        
                    }
                    else
                    {
                        return BadRequest(
                            new UserRegistrationResponse() {
                                Errors = isCreated.Errors.Select(x => x.Description).ToList(),
                                isSuccess = false
                            }); ;
                    }
                }
            }
            else
            {
                return BadRequest(new UserRegistrationResponse()
                { 
                Errors = new List<string>()
                {
                    "Invalid Payload"
                },
                isSuccess = false
                });
            }
        }


        //Login End Point
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> UserLogin([FromBody] UserLoginRequest userLogin)
        {
            if(ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(userLogin.Email);
                if(existingUser == null)
                {
                    return BadRequest(new UserRegistrationResponse() { 
                    Errors = new List<string>()
                    {
                        "Invalid Login Creadintials"
                    },
                    isSuccess = false
                    });
                }
                var isCorrect = await _userManager.CheckPasswordAsync(existingUser,userLogin.Password);
                var UserRole = await _userManager.GetRolesAsync(existingUser);
                if (!isCorrect || UserRole[0] != userLogin.UserRole)
                {
                    return BadRequest(new UserRegistrationResponse() { 
                    Errors = new List<string>()
                    {
                        "Invalid login Cradintials"
                    },
                    isSuccess = false
                    });
                }
                var token = await GenerateJwtToken(existingUser);
             

                return Ok(token);
            }
            return BadRequest(new UserRegistrationResponse() { 
            Errors = new List<string> (){
            "Invalid Payload"
            },
            isSuccess = false
            });
        }



        //Refrsh Token End point
        [HttpPost]
        [Route("RefreshToken")]
        public async Task<AuthResult> RefreshToken([FromBody] TokenRequest tokenRequest)
        {
            var tokenHandelar = new JwtSecurityTokenHandler();
          
            try
            {
                _tokenValidatorParameter.ValidateLifetime = false;
            // 1. Validate Token
            //var TokenInVarification = tokenHandelar.ValidateToken(tokenRequest.RefreshToken,_tokenValidationParameters,out var validatedToken);
           var TokenInVarification = tokenHandelar.ValidateToken(tokenRequest.JwtToken, _tokenValidatorParameter, out var validatedToken);

                // 2. Validate Token State
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
            {
                var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,StringComparison.InvariantCultureIgnoreCase);

                    if (result == false)
                {
                    return null;
                }
            }

                // 3. Validate Expiration Time
                var test = TokenInVarification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value;
            var utcExpirationDate = long.Parse(TokenInVarification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
            var expDate = UtcDateToDateTime(utcExpirationDate);

            if(expDate > DateTime.UtcNow)
            {
                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>() {
                        "Token Not Expired Yet"
                    }

                };
            }


            // 4. Validate Token Existance

            var storedToken =  _userContext.GP_RefreshToken.Where(x => x.Token == tokenRequest.RefreshToken).FirstOrDefault();

                if (storedToken == null)
            {
                return 
                    new AuthResult()
                    {
                        isSuccess = false,
                        Errors = new List<string>() { 
                        "Token does Not Exist"
                        }
                    };
            }


            //5. validate isUsed

            
            
            if (!storedToken.IsValid)
            {
                return new AuthResult() { 
                isSuccess = false,
                Errors = new List<string>()
                {
                    "Token is not Valid it is already used"
                }
                };
            }

            //6. validate isRevoked


            if (storedToken.IsRevorked)
            {
                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>()
                {
                    "Token is not Valid it is already used"
                }
                };
            }

            //7. validate Token id

            var jti = TokenInVarification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            if(jti != storedToken.JwtId)
            {

                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>()
                {
                    "Id Does not match"
                }
                };
            }
            storedToken.IsValid = false;
            _userContext.GP_RefreshToken.Update(storedToken);
            _userContext.SaveChanges();

            var user = await _userManager.FindByIdAsync(storedToken.UserId);

            return await GenerateJwtToken(user);

            }catch (Exception ex)
            {
                if (ex.Message.Contains("Lifetime validation failed. The token is expired."))
                {
                    return new AuthResult()
                    {
                        Errors = new List<string>()
                    {
                        "Token LifeTime is expired"
                    },
                        isSuccess = false
                    };

                }
                else
                {
                    return new AuthResult()
                    {
                        Errors = new List<string>()
                    {
                        "Somthing Went Wrong"
                    },
                        isSuccess = false
                    };

                }
            }

        }
        


        // Add Role To a User

        private async Task<AuthResult> AddRoleToUser(string userRole, string email)
        {
            //Check for valid userRole and Email
            if (userRole == null || email == null)
                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>()
                    {

                    "Invalid User Role or Email"
                    }
                };

            var role = await _roleManager.FindByNameAsync(userRole);

            //Check Role exist or not
            if (role == null)
            {
                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>()
                    {

                    "Invalid User Role"
                    }
                };
            }
            var user = await _userManager.FindByEmailAsync(email);


            //Check User Exist or not
            if (user == null)
            {
                return new AuthResult()
                {
                    isSuccess = false,
                    Errors = new List<string>()
                    {

                    $"User {user} already Added To the {role}Role"
                    }
                };
            }

            var result = await _userManager.AddToRoleAsync(user, userRole);

            //if user role is added successfully
            if (result.Succeeded)
                return new AuthResult()
                {
                    isSuccess = true,
                    Errors = null
                };


           return new AuthResult()
            {
                isSuccess = false,
                Errors = new List<string>()
                {

                        $"User {user} already Added To {role} Role"
                }
            };

        }


        //Get User Role

        public async Task<string> GetUseRoles(string email)
        {
            if (email == null)
                return null;

            //check Weather user is exist or not

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

            var result = await _userManager.GetRolesAsync(user);


            return  result[0];

        }




        //Remove user From Role

        public async Task<AuthResult> RemoveUserFromRole(string userRole, string email)
        {
            if (userRole == null || email == null)
            {
                return new AuthResult()
                {
                    isSuccess = false,

                    Errors = new List<string>()
                    {
                        "Invalid User Role Or Email"
                    } 
                };
            }

            var user = await _userManager.FindByEmailAsync(email);

            //check If user Exist or not

            if (user == null)
            {

                return new AuthResult()
                {
                    isSuccess = false,

                    Errors = new List<string>()
                    {
                        "Invalid User Role Or Email"
                    }
                };
            }

            var role = await _roleManager.FindByNameAsync(userRole);

            //Check if role is Exist or not
            if (role == null)
            {
                return new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Role Not Found"
                    }
                };
            }
            var result = await _userManager.RemoveFromRoleAsync(user, userRole);

            //Check weather user removed from role or not 
            if (result.Succeeded)
            {
                return new AuthResult()
                {
                    isSuccess = true,
                    Errors = null
                   
                };
            }

            return new AuthResult()
            {
                isSuccess = false,

                Errors = new List<string>()
                    {

                    $"User {user} already removed from {role} Role"
                    }
            };

        }


        //Genetate Jwt Token
        private async Task<AuthResult> GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Key);

            var tokenDescripter = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())

                }),
                Expires = DateTime.UtcNow.AddSeconds(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            SecurityToken Token =  jwtTokenHandler.CreateToken(tokenDescripter);
            string jwtToken = jwtTokenHandler.WriteToken(Token);


            var refreshToken = new RefreshToken() {
                UserId = user.Id,
                AddedDate = DateTime.Now,
                ExpirationDate = DateTime.UtcNow.AddDays(5),
                Token = RandomString(36) + Guid.NewGuid(),
                IsRevorked = false,
                IsValid = true,
                JwtId = Token.Id,
                User = user

            };

            await _userContext.GP_RefreshToken.AddAsync(refreshToken);
                  _userContext.SaveChanges();


            var result = new AuthResult()
            {
                Errors = null,
                Token = jwtToken,
                RefreshToken = refreshToken.Token,
                UserRole = GetUseRoles(user.Email).Result.ToString(),
                isSuccess = true
            };

           
            return result;
        }


        //Genetate Random String
        private string RandomString(int length)
           {
            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            return new string(Enumerable.Repeat(chars,length).Select(x=>x[random.Next(x.Length)]).ToArray());
            
        }


        //Convert UtcDate To Date Time
        private DateTime UtcDateToDateTime(long utcExpirationDate)
        {

            var dateTimeVal = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTimeVal = dateTimeVal.AddSeconds(utcExpirationDate).ToUniversalTime();

            return dateTimeVal;
        }

    }
}
