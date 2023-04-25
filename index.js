const express = require("express");
const app = express();
const server_port = 8080;
const fs = require('fs');

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.post("/form", (req, res) => {
    console.log(req.body);
    const{id,nombre,apellido, Titulo, Autor, Editorial, Año}=req.body
    if (!nombre || !apellido) return res.redirect('/error.html')
    res.send(`Datos enviados con exito! <a href="/">Volver</a>`);
    fs.writeFile(`./public/data/id_${id}.txt`,`${id}, ${nombre}, ${apellido}, ${Titulo}, ${Autor}, ${Editorial}, ${Año}`,(error)=>{
        if (error) {
            console.log(`Error: ${error}`)
        }
    } )

});




app.listen(server_port, () => {console.log("Server Start! ");});