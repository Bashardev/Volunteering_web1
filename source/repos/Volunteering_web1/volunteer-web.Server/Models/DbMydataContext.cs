using Microsoft.EntityFrameworkCore;

namespace volunteer_web.Server.Models
{
    public class DbMydataContext : DbContext
    {
        public DbMydataContext(DbContextOptions<DbMydataContext> options) : base(options) { }

        public DbSet<UserModel> Register { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("name=DB1");
    }
}
