const urlBase = "http://localhost:3000"

$(() => {
    $("#formulario").submit(function(event) {
        event.preventDefault();
        const rut = $("#txt-rut").val();
        const nombre = $("#txt-nombre").val();
        const apellido = $("#txt-apellido").val();

        $.ajax({
            method: "GET",
            url: `${urlBase}/registrar-persona`,
            data: {
                rut,
                nombre,
                apellido
            },
            success: function(data) {
                // alert("Datos enviados")
            },
            error: function(error) {
                alert("Ha sucedido un error")
            }
        })
    })
})