const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { validate, clean, format, getCheckDigit } = require('rut.js')
const { readFileSync, writeFileSync } = require("fs")

const port = 3000;
const app = express();

const dataPersonas = `${__dirname}/data/personas.txt`;

app.use("/public/", express.static(`${__dirname}/assets`))

app.listen(port, () => console.log(`Aplicación ejecutandose por el puerto ${port}`));


app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
})

app.get("/registrar-persona", (request, response) => {
    let rut = request.query.rut
    const nombre = request.query.nombre
    const apellido = request.query.apellido

    try {
        if(rut == "") {
            return response.status(409).json({ "message": "Ingresar RUT"})
        }

        if(!validate(rut)) {
            return response.status(409).json({ "message": "RUT Inválido"})
        }

        rut = format(rut)

        const contentString = readFileSync(dataPersonas, "utf-8");
        const contentJS = JSON.parse(contentString);

        const busqueda = contentJS.find(item => item.rut == rut)

        if(busqueda) {
            return response.status(409).json({ "message": "RUT registrado previamente"})
        }

        if(nombre == "") {
            return response.status(409).json({ "message": "Ingresar nombre"})
        }

        if(apellido == "") {
            return response.status(409).json({ "message": "Ingresar apellido"})
        }
        
        // Línea para forzar error.
        // throw "Error en registro"
    
        const persona = {
            id: uuidv4(),
            rut,
            nombre,
            apellido
        }
    
        contentJS.push(persona);
        
        writeFileSync(dataPersonas, JSON.stringify(contentJS), "utf-8");
    
        response.json({ message: "Registro exitoso", data: persona})
    } catch (error) {
        response.status(500).json({ message: "Ocurrió un error, intente más tarde."})
    }
})


app.get("/listar-personas", (req, resp) => {
    const contentString = readFileSync(dataPersonas, "utf-8");
    const contentJS = JSON.parse(contentString);

    resp.json({ message: "Listado de personas registradas", data: contentJS })
})



