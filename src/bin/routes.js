const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Config
app.use(bodyParser.json());
app.use(cors());

const {db} = require('./db');
const { get } = require('mongoose');

//Routes
app.post('/api/users', (req, res) => {
    let data =  req.body;
    db.addUser(res, data);

})

app.post('/api/login', (req, res) => {
    let data = req.body;
    db.login(res, data);
})

app.put('/api/users/:id', (req, res) => {
    let {id} = req.params;
    let data = req.body;
    db.updateUser(res, id, data);
})

app.get('/api/users/:id', (req, res) => {
    let {id} = req.params;
    db.getUser(res, id);
})

app.delete('/api/users/:id', (req, res) => {
    let {id} = req.params;
    db.deleteUser(res, id);
})

//Rotas das Notas
app.post('/api/notes/:userId', (req, res) =>{
    let data = req.body;
    let {userId}  = req.params;

    data.id_user = userId;
    db.addNote(res, data);
})

app.get('/api/notes/:userId', (req,res) =>{
    let {userId} = req.params;
    db.getNotes(res, userId);
})

app.put('/api/notes/:id', (req, res) => {
    let{id} = req.params;
    let data = req.body;
    db.updateNote(res, id, data);
})

app.delete('/api/notes/:id', (req, res) =>{
    let {id} = req.params;
    db.deleteNote(res, id);
})

exports.app = app;
