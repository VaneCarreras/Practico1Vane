using Microsoft.AspNetCore.Mvc;
using Practico1Vane.Models;
using Practico1Vane.Data;
using Microsoft.AspNetCore.Authorization;

namespace Practico1Vane.Controllers;

[Authorize]
public class ProyectosController : Controller
{
    private ApplicationDbContext _context;

    //CONSTRUCTOR
    public ProyectosController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult ListadoProyectos(int? id)
    {
        var proyectos = _context.Proyectos.ToList();

        if (id != null)
        {
            proyectos = proyectos.Where(p => p.ProyectoID == id).ToList();
        }

        return Json(proyectos);
    }

    public JsonResult GuardarProyecto(int proyectoID, string nombre, string descripcion, DateTime fechaInicio, DateTime fechaFin, int importePresupuesto, Estado estado)
    {

        string resultado = "";

        if (!String.IsNullOrEmpty(nombre))
        {
            if (proyectoID == 0)
            { 
                var existeProyecto = _context.Proyectos.Where(p => p.Nombre == nombre).Count();
                if (existeProyecto == 0)
                {
                    var proyecto = new Proyecto
                    {
                        Nombre = nombre,
                        Descripcion = descripcion,
                        FechaInicio = fechaInicio,
                        FechaFin = fechaFin,
                        ImportePresupuesto = importePresupuesto,
                        Estado = estado

                    };
                    _context.Add(proyecto);
                    _context.SaveChanges();
                }
                else
                {
                    resultado = "YA EXISTE UN REGISTRO CON EL MISMO NOMBRE";
                }
            }
            else
            {
                var proyectoEditar = _context.Proyectos.Where(p => p.ProyectoID == proyectoID).SingleOrDefault();
                if (proyectoEditar != null)
                {
                    var existeProyecto = _context.Proyectos.Where(p => p.Nombre == nombre && p.ProyectoID != proyectoID).Count();
                    if (existeProyecto == 0)
                    {
                        proyectoEditar.Nombre = nombre;
                        proyectoEditar.Descripcion = descripcion;
                        proyectoEditar.FechaInicio = fechaInicio;
                        proyectoEditar.FechaFin = fechaFin;
                        proyectoEditar.ImportePresupuesto = importePresupuesto;
                        proyectoEditar.Estado = estado;
                        _context.SaveChanges();
                    }
                    else
                    {
                        resultado = "YA EXISTE UN REGISTRO CON EL MISMO NOMBRE";
                    }
                }
            }
        }
        else
        {
            resultado = "DEBE INGRESAR UN NOMBRE.";
        }

        return Json(resultado);
    }

    public JsonResult EliminarProyecto(int proyectoID)
    {
        var proyecto = _context.Proyectos.Find(proyectoID);
        _context.Remove(proyecto);
        _context.SaveChanges();

        return Json(true);
    }

}
