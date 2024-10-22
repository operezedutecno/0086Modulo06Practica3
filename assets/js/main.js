const urlBase = "http://localhost:3000"

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
})