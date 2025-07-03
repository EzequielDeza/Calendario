const express = require('express');
const app = express();
const cors = require('cors');

const { sequelize } = require('./data/sequelize');
//Importar el modelo Tarea para que Sequelize pueda sincronizarlo
// Esto es necesario para que Sequelize reconozca el modelo y lo sincronice con la base de datos
const { Tarea } = require('./models/tarea.model');

const PORT = 3000;
const TareasRoutes = require('./routes/tareas.routes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/tareas", TareasRoutes);


sequelize.sync({ force: false })
    .then(() => console.log("Base sincronizada"))
    .catch(err => console.error("Error:", err));


app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
