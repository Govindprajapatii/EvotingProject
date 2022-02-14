using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EVotingApi.Models.DTOs.Request
{
    public class StatusUpdateRequest
    {
        public int Id{ get; set; }
        public string Status { get; set; }
    }
}
