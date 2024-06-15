using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Practico1Vane.Models;
namespace Practico1Vane.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Proyecto> Proyectos { get; set; }
    public DbSet<Empleado> Empleados { get; set; }


}
