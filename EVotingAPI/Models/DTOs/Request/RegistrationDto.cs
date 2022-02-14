using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EVotingApi.Models.DTOs.Request
{
    public class RegistrationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public string Colony { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
