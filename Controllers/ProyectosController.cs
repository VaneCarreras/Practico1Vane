using Microsoft.AspNetCore.Mvc;
using Practico1Vane.Models;
using Practico1Vane.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

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
        // Crear una lista de SelectListItem que incluya el elemento adicional
        var selectListItems = new List<SelectListItem>
        {
            new SelectListItem { Value = "0", Text = "[SELECCIONE...]" }
        };

        // Obtener todas las opciones del enum
        var enumValues = Enum.GetValues(typeof(Estado)).Cast<Estado>();

        // Convertir las opciones del enum en SelectListItem
        selectListItems.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString()
        }));

        // Pasar la lista de opciones al modelo de la vista
        ViewBag.Estado = selectListItems.OrderBy(p => p.Text).ToList();

        return View();
    }

    public JsonResult ListadoProyectos(int? id)
    {

        var proyectos = _context.Proyectos.ToList();
        if (id != null)
        {
            proyectos = proyectos.Where(p => p.ProyectoID == id).ToList();
        }

        var proyectosMostrar = proyectos
        .Select(p => new VistaProyecto
        {
            ProyectoID = p.ProyectoID,
            Nombre = p.Nombre,
            Descripcion = p.Descripcion,
            FechaInicio = p.FechaInicio,
            InicioString = p.FechaInicio.ToString("dd/MM/yyyy HH:mm"),
            FechaFin = p.FechaFin,
            FinString = p.FechaFin.ToString("dd/MM/yyyy HH:mm"),
            ImportePresupuesto = p.ImportePresupuesto,
            Estado = p.Estado,
            EstadoString = p.Estado.ToString()
        })
        .ToList();


        return Json(proyectosMostrar);
    }

    public JsonResult GuardarProyecto(int proyectoID, string nombre, string descripcion, DateTime fechaInicio, DateTime fechaFin, string importePresupuesto, Estado estado)
    {
        int error = 0;

        if(error == 0)
        {        
            if (proyectoID == 0)
            {
                //4- GUARDAR EL EJERCICIO
                var proyecto = new Proyecto
                {
                    Nombre = nombre,
                    Descripcion = descripcion, 
                    FechaInicio = fechaInicio,
                    FechaFin = fechaFin,
                    ImportePresupuesto = importePresupuesto,
                    Estado = estado,
                };
                _context.Add(proyecto);
                _context.SaveChanges();
            }
            else
            {
                //QUIERE DECIR QUE VAMOS A EDITAR EL REGISTRO
                var proyectoEditar = _context.Proyectos.Where(p => p.ProyectoID == proyectoID).SingleOrDefault();
                if (proyectoEditar != null)
                {
                    proyectoEditar.Nombre = nombre; 
                    proyectoEditar.Descripcion = descripcion;
                    proyectoEditar.FechaInicio = fechaInicio;
                    proyectoEditar.FechaFin = fechaFin;
                    proyectoEditar.ImportePresupuesto = importePresupuesto;
                    proyectoEditar.Estado = estado;
                    _context.SaveChanges();
                }
            }
        }

        return Json(error);
    }

    public JsonResult EliminarProyecto(int proyectoID)
    {
        var proyecto = _context.Proyectos.Find(proyectoID);
        _context.Remove(proyecto);
        _context.SaveChanges();

        return Json(true);
    }

}
