
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

            proyectosMostrar.sort(function(a, b) {
                var fechaA = new Date(a.inicioString);
                var fechaB = new Date(b.inicioString);
                return fechaA - fechaB; // Ordenar de manera ASCENDENTE
            });

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
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("fechaFin").value = "";
    document.getElementById("importePresupuesto").value = "";
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
            document.getElementById("nombre").value = proyecto.nombre;
            document.getElementById("descripcion").value = proyecto.descripcion;
            document.getElementById("fechaInicio").value = proyecto.fechaInicio;
            document.getElementById("fechaFin").value = proyecto.fechaFin;
            document.getElementById("importePresupuesto").value = proyecto.importePresupuesto;
            document.getElementById("Estado").value = proyecto.estado;
            $("#ModalTitulo").text("Editar Proyecto");
            $("#ModalProyecto").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function GuardarRegistro(){
    let proyectoID = document.getElementById("ProyectoID").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaFin = document.getElementById("fechaFin").value;
    let importePresupuesto = document.getElementById("importePresupuesto").value;
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