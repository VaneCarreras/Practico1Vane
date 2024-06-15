using Microsoft.AspNetCore.Mvc;
using Practico1Vane.Models;
using Practico1Vane.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Practico1Vane.Controllers;

[Authorize]
public class EmpleadosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public EmpleadosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult ListadoEmpleados(int? id)
    {

        var empleados = _context.Empleados.ToList();
        if (id != null)
        {
            empleados = empleados.Where(e => e.EmpleadoID == id).ToList();
        }

        var empleadosMostrar = empleados
        .Select(e => new VistaEmpleado
        {
            EmpleadoID = e.EmpleadoID,
            Nombre = e.Nombre,
            FechaNac = e.FechaNac,
            FechaString = e.FechaNac.ToString("dd/MM/yyyy"),
            Domicilio = e.Domicilio,
            Email = e.Email,
            Telefono = e.Telefono,
            Salario = e.Salario,
        })
        .OrderBy(e => e.Nombre).ToList();



        return Json(empleadosMostrar);
    }

    public JsonResult GuardarEmpleado(int empleadoID, string nombre, DateOnly fechaNac, string domicilio, string email, string telefono, decimal salario)
    {
        int error = 0;

        if(error == 0)
        {        
            if (empleadoID == 0)
            {
                //4- GUARDAR EL EMPLEADO
                var empleado = new Empleado
                {
                    Nombre = nombre,
                    FechaNac = fechaNac,
                    Domicilio = domicilio,
                    Email = email,
                    Telefono = telefono,
                    Salario = salario,
                };
                _context.Add(empleado);
                _context.SaveChanges();
            }
            else
            {
                //QUIERE DECIR QUE VAMOS A EDITAR EL REGISTRO
                var empleadoEditar = _context.Empleados.Where(e => e.EmpleadoID == empleadoID).SingleOrDefault();
                if (empleadoEditar != null)
                {
                    empleadoEditar.Nombre = nombre; 
                    empleadoEditar.FechaNac = fechaNac;
                    empleadoEditar.Domicilio = domicilio;
                    empleadoEditar.Email = email;
                    empleadoEditar.Telefono = telefono;
                    empleadoEditar.Salario = salario;
                    _context.SaveChanges();
                }
            }
        }

        return Json(error);
    }

    public JsonResult EliminarEmpleado(int empleadoID)
    {
        var empleado = _context.Empleados.Find(empleadoID);
        _context.Remove(empleado);
        _context.SaveChanges();

        return Json(true);
    }

}
