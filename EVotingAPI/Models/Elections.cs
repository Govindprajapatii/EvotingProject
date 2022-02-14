using JwtLogin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EVotingApi.Models.DTOs
{
    public class Elections
    {
        [Key]
        public int ElectionId { get; set; }
        public string Title { get; set; }
        public string Opt1 { get; set; }
        public string Opt2 { get; set; }
        public string  Opt3 { get; set; }
        public string Opt4 { get; set; }
        public int MyProperty { get; set; }
        public string Winner { get; set; }
        public string Status { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime ElectionDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        [ForeignKey(nameof(UserId))]

        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<ElectionUser> ElectionsUser { get; set; }
    }
}
