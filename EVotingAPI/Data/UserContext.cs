using Microsoft.EntityFrameworkCore;
using JwtLogin.Models;
using EVotingApi.Models.DTOs;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace JwtLogin.Data
{
    public class UserContext : IdentityDbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ElectionUser>().HasKey(eu => new { eu.ElectionId,eu.UserId });
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> GP_Users { get; set; }
        public DbSet<RefreshToken> GP_RefreshToken { get; set; }

        public DbSet<Elections> GP_Elections { get; set; }
        public DbSet<ElectionUser> GP_ElectionUser { get; set; }
        public UserContext(DbContextOptions<UserContext> options) :base(options)
        {

        }

        
    }
}
