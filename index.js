const express = require("express");
const app = express();
const server_port = 8080;
const fs = require('fs');

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.post("/form", (req, res) => {
    console.log(req.body);
    const{id,nombre,apellido, Titulo, Autor, Editorial, Año}=req.body
    if (!nombre || !apellido) return res.redirect('/error.html');
    const path = `${__dirname}/public/data/id_${id}.txt`;
    //res.send(`Datos enviados con exito! 
    //            <a href="/">Volver</a>
    //            <a href="localhost:${server_port}/download/${id}">descargar</a>`);
    fs.writeFileSync(path,`${id}, ${nombre}, ${apellido}, ${Titulo}, ${Autor}, ${Editorial}, ${Año}`,(error)=>{
        if (error) {
            console.log(`Error: ${error}`)
        }
    });

    res.download(path);



    res.send(`Datos enviados con exito! 
                <div>
                <a href="/">Volver</a>
                </div>
                <a href="localhost:${server_port}/download/${id}">descargar</a>`);
    
});


 app.get('/download/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const path = `${__dirname}/public/data/id_${id}.txt`;
    res.download(path);
});




app.listen(server_port, () => {console.log("Server Start! ");});