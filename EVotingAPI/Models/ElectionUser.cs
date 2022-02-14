using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using JwtLogin.Models;

namespace EVotingApi.Models.DTOs
{
    public class ElectionUser
    {
        
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(ElectionId))]
        public int ElectionId { get; set; }
        public Elections Elections { get; set; }
    }
}
