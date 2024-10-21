const express = require("express");
const port = 3000;
const app = express();

app.use("/public/", express.static(`${__dirname}/assets`))

app.listen(port, () => console.log(`Aplicación ejecutandose por el puerto ${port}`));


app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
})



