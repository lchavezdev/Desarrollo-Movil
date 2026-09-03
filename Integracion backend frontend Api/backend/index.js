const express = require('express');
const cors = require('cors'); // Requerido para conectar con React Native en la Web (localhost)
const { Op } = require('sequelize');
const Maestro = require('./Modelo/Maestro');
const Clase = require('./Modelo/Clase');


const app = express();

app.use(cors()); // Habilita las peticiones cruzadas para la Web
app.use(express.json());

//ruta de acceso
//codigo de respuestas -- > 200,401,500, 404, etc 
//response y requet 
//manjo de errores 

Maestro.belongsToMany(Clase, { through: 'MaestroClase', foreignKey: 'MaestroId', otherKey: 'ClaseId', timestamps: false });
Clase.belongsToMany(Maestro, { through: 'MaestroClase', foreignKey: 'ClaseId', otherKey: 'MaestroId', timestamps: false });

//get 

app.get('/maestros', async (req, res) => {

    try {


        const maestros = await Maestro.findAll({
            include: Clase
        });

        if (maestros.length === 0) {
            return res.status(402).json({
                message: 'No hay maestros',
            });
        }

        res.status(200).json(maestros);

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los maestros',
            error: error.message
        });
    }

})

app.get('/clases', async (req, res) => {
    try {
        const clases = await Clase.findAll();

        if (clases.length === 0) {
            return res.status(402).json({ message: 'No hay clases registradas' });
        }
        res.status(200).json(clases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clases', error: error.message });
    }
});



app.get('/maestros/buscar', async (req, res) => {
    try {
        const { nombreClase } = req.query;

        const maestros = await Maestro.findAll({
            include: {
                model: Clase,
                where: {
                    nombre: { [Op.like]: `%${nombreClase}%` }
                }
            }
        });

        if (maestros.length === 0) {
            return res.status(402).json({
                message: 'Maestros no encontrados para esta clase',
            });
        }

        res.status(200).json(maestros);

    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar los maestros',
            error: error.message
        });
    }
})

app.post('/maestros', async (req, res) => {
    try {

        console.log(req.body);


        const maestro = await Maestro.create(req.body);
        res.status(200).json(maestro);

    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar los maestros',
            error: error.message
        });
    }

})

app.put('/maestros/:id', async (req, res) => {
    try {


        const [updated] = await Maestro.update(req.body,
            { where: { id: req.params.id } }
        );

        if (updated) {
            return res.status(200).json({
                message: 'Maestro actualizado correctamente',
            });
        }
        else {
            return res.status(402).json({
                message: 'Maestro no encontrado',
            });
        }


    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar los maestros',
            error: error.message
        });
    }

})

app.delete('/maestros/:id', async (req, res) => {
    try {


        const deleted = await Maestro.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            return res.status(200).json({
                message: 'Maestro eliminado correctamente',
            });
        }
        else {
            return res.status(402).json({
                message: 'Maestro no encontrado',
            });
        }

    } catch (error) {

        res.status(500).json({
            message: 'Error al eliminar el maestro',
            error: error.message
        });
    }
})

app.post('/maestros/asignar-clase', async (req, res) => {
    try {
        const { maestroId, claseId } = req.body;

        const maestro = await Maestro.findByPk(maestroId);
        const clase = await Clase.findByPk(claseId);

        if (!maestro || !clase) {
            return res.status(402).json({
                message: 'Maestro o Clase no encontrados',
            });
        }

        await maestro.addClase(clase);

        res.status(200).json({
            message: 'Clase asignada al maestro correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al asignar la clase',
            error: error.message
        });
    }
})

app.post('/clases', async (req, res) => {
    try {
        const clase = await Clase.create(req.body);
        res.status(200).json(clase);
    } catch (error) {
        res.status(500).json({
            message: 'Error al guardar la clase',
            error: error.message
        });
    }
})


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
