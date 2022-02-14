using EVotingApi.Models.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace JwtLogin.Models
{
    public class User 
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public string Colony { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public string Password { get; set; }
       
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ICollection<ElectionUser> ElectionsUser { get; set; } 
        public ICollection<Elections> Elections { get; set; }


    }
}
