using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Xml.Schema;
using Practico1Vane.Models;

namespace Practico1Vane.Models
{
    public class Empleado
    {
        [Key]
        public int EmpleadoID { get; set; }
        public string? Nombre { get; set; }
        public DateOnly FechaNac { get; set; }
        public string? Domicilio { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public decimal Salario { get; set; }  
    }

    public class VistaEmpleado
    {
        public int EmpleadoID { get; set; }
        public string? Nombre {get;set;}
        public DateOnly FechaNac { get; set; }
        public string? Domicilio { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? FechaString { get; set; }
        public decimal Salario {get; set; }
    }

    

    
}