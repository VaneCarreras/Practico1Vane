window.onload = ListadoEmpleados();

function ListadoEmpleados(){
 
    $.ajax({
        url: '../../Empleados/ListadoEmpleados',
        data: {  },
        type: 'POST',
        dataType: 'json',
        success: function (empleadosMostrar) {

            $("#ModalEmpleado").modal("hide");
            LimpiarModal();

            let contenidoTabla = ``;

            $.each(empleadosMostrar, function (index, empleado) {  
                
                contenidoTabla += `
                <tr>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.fechaString}</td>
                    <td>${empleado.domicilio}</td>
                    <td>${empleado.email}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.salario}</td>

                    <td class="text-center">
                    <button type="button" class="btn btn-success btn-sm" onclick="AbrirModalEditar(${empleado.empleadoID})">
                    <i class="fa-solid fa-marker">Editar</i>
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="EliminarRegistro(${empleado.empleadoID})">
                    <i class="fa-solid fa-trash">Eliminar</i>
                    </button>
                    </td>
                </tr>
             `;
            });

            document.getElementById("tbody-empleados").innerHTML = contenidoTabla;

        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function LimpiarModal(){
    document.getElementById("EmpleadoID").value = 0;
    document.getElementById("Nombre").value = "";
    document.getElementById("FechaNac").value = "";
    document.getElementById("Domicilio").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("Salario").value = 0;
}

function NuevoRegistro(){
    $("#ModalTitulo").text("Nuevo Empleado");
}

function AbrirModalEditar(empleadoID){
    
    $.ajax({
        url: '../../Empleados/ListadoEmpleados',
        data: { id: empleadoID},
        type: 'POST',
        dataType: 'json',
        success: function (empleadosMostrar) {
            let empleado = empleadosMostrar[0];

            document.getElementById("EmpleadoID").value = empleadoID;
            $("#ModalTitulo").text("Editar Empleado");
            document.getElementById("Nombre").value = empleado.nombre;
            document.getElementById("FechaNac").value = empleado.fechaNac;
            document.getElementById("Domicilio").value = empleado.domicilio;
            document.getElementById("Email").value = empleado.email;
            document.getElementById("Telefono").value = empleado.telefono;
            document.getElementById("Salario").value = empleado.salario;
            $("#ModalEmpleado").modal("show");
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para ser modificado.');
        }
    });
}

function GuardarRegistro(){
    let empleadoID = document.getElementById("EmpleadoID").value;
    let nombre = document.getElementById("Nombre").value;
    let fechaNac = document.getElementById("FechaNac").value;
    let domicilio = document.getElementById("Domicilio").value;
    let email = document.getElementById("Email").value;
    let telefono = document.getElementById("Telefono").value;
    let salario = document.getElementById("Salario").value;

    console.log(nombre);
    $.ajax({
        url: '../../Empleados/GuardarEmpleado',
        data: { empleadoID: empleadoID, nombre: nombre, fechaNac: fechaNac, domicilio: domicilio, email: email, telefono: telefono, salario: salario},
        type: 'POST',
        dataType: 'json',
        success: function (error) {
            if(error == 0){
                ListadoEmpleados();
            }

        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el registro');
        }
    });    
}

function EliminarRegistro(empleadoID){
    $.ajax({
        url: '../../Empleados/EliminarEmpleado',
        data: { empleadoID: empleadoID },
        type: 'POST',
        dataType: 'json',
        success: function (resultado) {      
            ListadoEmpleados();
        },

        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al eliminar el registro.');
        }
    });    

}