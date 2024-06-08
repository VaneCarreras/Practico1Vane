using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Xml.Schema;
using Practico1Vane.Models;

namespace Practico1Vane.Models
{
    public class Proyecto
    {
        [Key]
        public int ProyectoID { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string? ImportePresupuesto { get; set; }   
        public Estado Estado {get; set; }
    }

    public class VistaProyecto
    {
        public int ProyectoID { get; set; }
        public string? Nombre {get;set;}
        public string? Descripcion {get;set;}
        public DateTime FechaInicio { get; set; }
        public string? InicioString { get; set; }
        public DateTime FechaFin { get; set; }
        public string? FinString { get; set; }
        public string? ImportePresupuesto {get; set; }
        public Estado Estado {get; set; } 
        public string? EstadoString {get; set; } 
    }

    public enum Estado{
        Pendiente = 1,
        En_Desarrollo,
        Finalizado
    }

    
}