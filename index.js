const express = require("express");
const app = express();
const server_port = 8080;
const fs = require('fs');

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.post("/form", (req, res) => {
    const{id,nombre,apellido, Titulo, Autor, Editorial, Año}=req.body
    if (!nombre || !apellido) return res.redirect('/error.html');
    const path = `${__dirname}/public/data/id_${id}.txt`;
    const data = `${id}, ${nombre}, ${apellido}, ${Titulo}, ${Autor}, ${Editorial}, ${Año}`;
    escribirArchivo(path,data);
    descargarArchivo(res,path);
    success(res,id);
});


escribirArchivo = async (path, data) => {
   await fs.writeFileSync(path,data,(error)=>{
        if (error) {
            console.log(`Error: ${error}`)
        }
    });
};

descargarArchivo = async (res,path) => {
    await res.download(path);
}

success = async (res,id) => {
    await res.send(`Datos enviados con exito! 
    <div>
    <a href="/">Volver</a>
    </div>
    <a href="localhost:${server_port}/download/${id}">descargar</a>`);
}



app.get('/download/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const path = `${__dirname}/public/data/id_${id}.txt`;
    descargarArchivo(res,path);
});


app.listen(server_port, () => {console.log("Server Start! ");});