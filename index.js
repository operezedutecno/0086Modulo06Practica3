const express = require("express");
const { v4: uuidv4 } = require('uuid');
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
    const rut = request.query.rut
    const nombre = request.query.nombre
    const apellido = request.query.apellido

    const persona = {
        id: uuidv4(),
        rut,
        nombre,
        apellido
    }

    const contentString = readFileSync(dataPersonas, "utf-8");
    const contentJS = JSON.parse(contentString);

    contentJS.push(persona);
    
    writeFileSync(dataPersonas, JSON.stringify(contentJS), "utf-8");

    response.json({ message: "Registro exitoso", data: persona})
})



