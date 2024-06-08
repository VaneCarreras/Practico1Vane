
window.onload = ListadoProyectos();

function ListadoProyectos(){
 
    $.ajax({
        url: '../../Proyectos/ListadoProyectos',
        data: {  },
        type: 'POST',
        dataType: 'json',
        success: function (proyectos) {

            $("#ModalProyecto").modal("hide");
            LimpiarModal();
            let contenidoTabla = ``;

            $.each(proyectos, function (index, proyecto) {  
                
                contenidoTabla += `
                <tr>
                    <td>${proyecto.nombre}</td>
                    <td>${proyecto.descripcion}</td>
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
        success: function (proyectos) {
            let proyecto = proyectos[0];

            document.getElementById("ProyectoID").value = proyectoID;
            $("#ModalTitulo").text("Editar Proyecto");
            document.getElementById("nombre").value = proyecto.nombre;
            document.getElementById("descripcion").value = proyecto.descripcion;
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
    console.log(nombre);
    $.ajax({
        url: '../../Proyectos/GuardarProyecto',
        data: { proyectoID: proyectoID, nombre: nombre, descripcion: descripcion},
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {

            if(resultado != ""){
                alert(resultado);
            }
            ListadoProyectos();
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