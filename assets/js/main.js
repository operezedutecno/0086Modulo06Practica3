const urlBase = "http://localhost:3000"

const listarPersonas = () => {
    $.ajax({
        method: "GET",
        url: `${urlBase}/listar-personas`,
        data: {},
        success: function(data) {
            $("#tabla-personas tbody").html("");
            data.data.forEach(persona => {
                $("#tabla-personas tbody").append(`
                    <tr>
                        <td>${persona.id}</td>
                        <td>${persona.rut}</td>
                        <td>${persona.nombre}</td>
                        <td>${persona.apellido}</td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            $("#tabla-personas tbody").html(`
                <tr>
                    <td colspan="4" class="text-center text-danger">No es posible consultar las personas registradas</td>
                </tr>
            `);
        }
    })
}

$(() => {
    $("#formulario").submit(function(event) {
        event.preventDefault();
        const rut = $("#txt-rut").val();
        const nombre = $("#txt-nombre").val();
        const apellido = $("#txt-apellido").val();

        $(".error").addClass("d-none")

        $.ajax({
            method: "GET",
            url: `${urlBase}/registrar-persona`,
            data: {
                rut,
                nombre,
                apellido
            },
            success: function(data) {
                alert(data.message)
                $("#txt-rut, #txt-nombre, #txt-apellido").val("")
                listarPersonas()
            },
            error: function(error) {
                if(error.status == 409) {
                    $("#alert-validation").removeClass("d-none").html(error?.responseJSON?.message || '')
                } else {
                    $("#alert-error").removeClass("d-none").html(error?.responseJSON?.message || 'Error interno')
                }
            }
        })
    })

    listarPersonas();
})