const mongoose = require('mongoose');

const MONGO_URI='mongodb://localhost:27017/lembreteapp'

//Models
const User = require('./models/User');
const Note = require('./models/Notes');


class Controller {
    constructor() {
        this.connect();
    }
    async connect() {
        try{
             await mongoose.connect(MONGO_URI, {
                 useNewUrlParser: true
             });
             console.info('Conectado ao banco');
        }catch(err){
          console.error(err);
        }
    }

    //Queries
    addUser(res, data){
        User.create(data, (err, newUser) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Created',
                user: newUser
            })
        })
    }

    login(res, data){
         User.findOne({
             $and: [
                 {email: data.email},
                 {password: data.password}
             ]
         }, (err,user) =>{
             if(err) throw err;
             res.json({
                 status:200,
                 message: 'Ok',
                 user
             })
         })
    }

    updateUser(res, id, data) {
        User.updateOne({
            _id: id
        }, data, (err, updatedUser) =>{
            if (err) throw err;
            res.json({
                status:200,
                message: 'Updated',
                user: updatedUser
            })
        })
    }

    getUser(res, id){
        User.findOne({
            _id: id
        }, (err, user) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Ok',
                user
            })
        })
    }

    deleteUser(res,id){
        User.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Deleted'
            })
        })
    }

    //notes
    addNote(res,data){
        Note.create(data, (err, note) =>{
            if (err) throw err;
            res.json({
                status: 200,
                message: 'Created',
                note
            })

        })
    }

    getNotes(res, userId){
        Note.find({
            id_user: userId
        }, (err, notes) => {
            if (err) throw err;
            res.json({
               status: 200,
               message: 'Ok',
               notes
            })
        })
    }

    updateNote(res, id, data){
        Note.updateOne({
            _id: id
        }, data, (err, updatedNote) => {
            if (err) throw err;
            res.json({
               status: 200,
               message: 'Updated',
               note: updatedNote
            })
        })
    }

    deleteNote(res, id){
        Note.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            res.json({
               status: 200,
               message: 'Deleted'
            })
        })
    }
}

exports.db = new Controller();