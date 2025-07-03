const express = require('express');
const router = express.Router();

const { Tarea } = require('../models/tarea.model');

//Endpoint para obtener todas las tareas
router.get("/", async (req, res) => {
    try {
        const tareas = await Tarea.findAll();
        res.status(200).json(tareas);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tareas" });
    }
});

//Endpoint para obtener las tareas por fecha
router.get("/fecha/:fecha", async (req, res) => {
    const fecha = req.params.fecha;
    try {
        const tareasPorFecha = await Tarea.findAll({
            where: { fecha }
        });
        res.status(200).json(tareasPorFecha);
    } catch (error) {
        console.error("Error al obtener las tareas por fecha:", error);
        res.status(500).json({ error: "Error al obtener las tareas por fecha" });
    }
});

//Endpoint para crear una nueva tarea
router.post("/", async (req, res) => {
    try {
        const nuevaTarea = await Tarea.create(req.body);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
});

//Endpoint para editar una tarea por ID
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await Tarea.update(req.body, {
            where: { id }
        });
        if (updated) {
            const tareaActualizada = await Tarea.findByPk(id);
            res.status(200).json(tareaActualizada);
        } else {
            res.status(404).json({ error: "Tarea no encontrada" });
        }
    } catch (error) {
        console.error("Error al editar la tarea:", error);
        res.status(500).json({ error: "Error al editar la tarea" });
    }
});

//Endpoint para eliminar una tarea por ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const tareaEliminada = await Tarea.destroy({
            where: { id }
        });
        if (tareaEliminada) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Tarea no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
});



module.exports = router;

