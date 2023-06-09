const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

// Datos iniciales
let tasks = [];

// Ruta para crear una tarea
app.post('/tasks', (req, res) => {
    console.log(req.body);
  const { task } = req.body;
  console.log(task);
  tasks.push(task);
  res.status(201).json({ message: 'Tarea creada exitosamente' });
});

// Ruta para ver todas las tareas
app.get('/tasks', (req, res) => {
    console.log(tasks);
  res.json({ tasks });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});