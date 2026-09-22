const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = 3000;
const conexionBD = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'basededatos',
    database: 'appbase'
});


app.use(express.json());

app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto localhost:${PORT}`));

app.get('/productos', (req, res)=>{
    const sql = 'SELECT * FROM productos';
    conexionBD.query(sql, (error, results)=> {
        if (error){
            res.status(400).json({status: 400, message: 'Error en la conexion'});
        }
        else{
            res.status(200).json({status: 200, data: results});
        }
    })
});

app.post('/productos', (req, res)=> {
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, estado, categoria, urlFotografia) VALUES (?,?,?,?,?,?)';
    const params = [
        req.body.nombre,
        req.body.descripcion,
        req.body.precio,
        req.body.estado,
        req.body.categoria,
        req.body.urlFotografia
    ];
    conexionBD.query(sql, params, (error, results)=> {
        if(error){
            res.status(400).json({status: 400, message: 'Error en la conexion'});
        }
        else{
            res.status(201).json({status: 201, message: 'Exito al registrar el producto', data: results});
        }
    })
});

app.delete('/items/:id', (req, res)=> {
    const sql = 'DELETE FROM productos where id=?';
    const id = req.params.id;
    
    conexionBD.query(sql, [id], (error, results)=>{
        if(error){
            res.status(400).json({status: 400, message: 'Error en la conexion'});
        }
        else{
            res.status(200).json({status: 200, message: 'Exito al eliminar el producto', data: results});
        }
    })
})