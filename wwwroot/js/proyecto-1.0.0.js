
window.onload = ListadoProyectos();

function ListadoProyectos(){
 
    $.ajax({
        url: '../../Proyectos/ListadoProyectos',
        data: {  },
        type: 'POST',
        dataType: 'json',
        success: function (proyectosMostrar) {

            $("#ModalProyecto").modal("hide");
            LimpiarModal();

           
            

            let contenidoTabla = ``;

            $.each(proyectosMostrar, function (index, proyecto) {  
                
                contenidoTabla += `
                <tr>
                    <td>${proyecto.nombre}</td>
                    <td>${proyecto.descripcion}</td>
                    <td>${proyecto.inicioString}</td>
                    <td>${proyecto.finString}</td>
                    <td>${proyecto.importePresupuesto}</td>
                    <td>${proyecto.estadoString}</td>

                    <td class="text-center">
                    <button type="button" class="btn btn-success btn-sm" onclick="AbrirModalEditar(${proyecto.proyectoID})">
                    <i class="fa-solid fa-marker">Editar</i>
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="EliminarRegistro(${proyecto.proyectoID})">
                    <i class="fa-solid fa-trash">Eliminar</i>
                    </button>
                    </td>
                </tr>
             `;
            });

            document.getElementById("tbody-proyectos").innerHTML = contenidoTabla;

        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function LimpiarModal(){
    document.getElementById("ProyectoID").value = 0;
    document.getElementById("Nombre").value = "";
    document.getElementById("Descripcion").value = "";
    document.getElementById("FechaInicio").value = "";
    document.getElementById("FechaFin").value = "";
    document.getElementById("ImportePresupuesto").value = "";
    document.getElementById("Estado").value = 0;
}

function NuevoRegistro(){
    $("#ModalTitulo").text("Nuevo Proyecto");
}

function AbrirModalEditar(proyectoID){
    
    $.ajax({
        url: '../../Proyectos/ListadoProyectos',
        data: { id: proyectoID},
        type: 'POST',
        dataType: 'json',
        success: function (proyectosMostrar) {
            let proyecto = proyectosMostrar[0];

            document.getElementById("ProyectoID").value = proyectoID;
            $("#ModalTitulo").text("Editar Proyecto");
            document.getElementById("Nombre").value = proyecto.nombre;
            document.getElementById("Descripcion").value = proyecto.descripcion;
            document.getElementById("FechaInicio").value = proyecto.fechaInicio;
            document.getElementById("FechaFin").value = proyecto.fechaFin;
            document.getElementById("ImportePresupuesto").value = proyecto.importePresupuesto;
            document.getElementById("Estado").value = proyecto.estado;
            $("#ModalProyecto").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function GuardarRegistro(){
    let proyectoID = document.getElementById("ProyectoID").value;
    let nombre = document.getElementById("Nombre").value;
    let descripcion = document.getElementById("Descripcion").value;
    let fechaInicio = document.getElementById("FechaInicio").value;
    let fechaFin = document.getElementById("FechaFin").value;
    let importePresupuesto = document.getElementById("ImportePresupuesto").value;
    let estado = document.getElementById("Estado").value;

    console.log(nombre);
    $.ajax({
        url: '../../Proyectos/GuardarProyecto',
        data: { proyectoID: proyectoID, nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio, fechaFin: fechaFin, importePresupuesto: importePresupuesto, estado: estado},
        type: 'POST',
        dataType: 'json',
        success: function (error) {
            if(error == 0){
                ListadoProyectos();
            }
            if(error == 1){
                alert("FECHAS INCORRECTAS");
            }

        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });    
}

function EliminarRegistro(proyectoID){
    $.ajax({
        url: '../../Proyectos/EliminarProyecto',
        data: { proyectoID: proyectoID},
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {      
            ListadoProyectos();
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });    

}