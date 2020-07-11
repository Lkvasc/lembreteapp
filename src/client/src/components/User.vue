<template>
  <v-layout row wrap justify-center align-center id="main">
    <v-app-bar app color="indigo">
      <h2 class="white--text">Seja bem vindo, {{user.name}}</h2>
      <v-layout row wrap justify-end>
        <v-btn color="indigo lighten-1" fab @click="newNote = true">
          <v-icon large color="white">mdi-plus</v-icon>
        </v-btn>
      </v-layout>
    </v-app-bar>
    <v-layout row wrap justify-center align-start>
      <v-card class="ma-4" color="indigo" dark v-for="(note, index) in notes" :key="index">
        <v-card-text>
          <h3>{{note.title}}</h3>
          <p>{{note.content}}</p>
          <v-btn :color="note.state ? 'success' : 'error'" depressed outlined small>
            <span v-text="note.state ? 'Feita' : 'Não feita'"></span>
            <v-icon v-if="note.state">mdi-check</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
          <v-btn class="ml-2" color="indigo" fab small @click="noteToEdit(index)">
            <v-icon color="white">mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn class="ml-2" color="red darken-4" fab small @click="deleteNoteAsk = true; noteId = note._id">
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-dialog v-model="newNote" :overlay="false" max-width="500px" transition="scale-transition">
        <v-card class="pa-4">
          <v-card-text>
            <v-text-field label="Título" color="white" v-model="noteToCreate.title"></v-text-field>
            <v-textarea label="Conteúdo da nota" color="white" v-model="noteToCreate.content"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="addNote()">Criar nota</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deleteNoteAsk" :overlay="false" max-width="300px" transition="scale-transition">
        <v-card class="pa-4">
          <v-card-text>
            <h2>Confirmar exclusão da nota?</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="deleteNote()">Sim</v-btn>
            <v-btn color="error" @click="deleteNoteAsk = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" :overlay="false" max-width="500px" transition="scale-transition">
        <v-card class="pa-4">
          <v-card-text>
            <v-text-field color="black" label="Title" v-model="noteEdit.title"></v-text-field>
            <v-text-field color="black" label="Content" v-model="noteEdit.content"></v-text-field>
            <v-btn color="indigo" class="ma-4" dark depressed @click="noteEdit.state = true">Feita</v-btn>
            <v-btn color="red darken-2" class="ml-3" dark depressed @click="noteEdit.state = false">Não feita
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap justify-end>
              <v-btn color="success" @click="updateNote(noteEdit._id)">Atualizar nota</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog>
      <v-btn color="warning" @click="hasAccount = false">Registrar-se</v-btn>
      </v-dialog>
    </v-layout>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        user: new Object(),
        notes: [],
        dialog: false,
        deleteNoteAsk: false,
        newNote: false,
        noteId: null,
        noteEdit: new Object(),
        noteToCreate: new Object()
      }
    },
    mounted() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getNotes();
    },
    methods: {
      getNotes() {
        var id = this.user._id;
        axios.get(`http://localhost:3000/api/notes/${id}`)
          .then((res) => {
            this.notes = res.data.notes;
          })
      },
      noteToEdit(index) {
        this.dialog = true;
        this.noteEdit = this.notes[index];
      },
      updateNote(id) {
        var data = {
          title: this.noteEdit.title,
          content: this.noteEdit.content,
          state: this.noteEdit.state
        }
        axios.put(`http://localhost:3000/api/notes/${id}`, data)
          .then((res) => {
            console.log(res.data.message);
            this.getNotes();
          })

        this.dialog = false
      },
      deleteNote() {
        var id = this.noteId;
        axios.delete(`http://localhost:3000/api/notes/${id}`)
          .then((res) => {
            console.log(res.data.message);
            this.getNotes();
            this.deleteNoteAsk = false
          })
      },
      addNote() {
        var data = {
          title: this.noteToCreate.title,
          content: this.noteToCreate.content
        };
        var userId = this.user._id;
        axios.post(`http://localhost:3000/api/notes/${userId}`, data)
          .then((res) => {
            console.log(res.data.message);
            this.newNote = false;
            this.getNotes();
          })
      }
    }
  }
</script>

<style scoped>
  #main {
    min-height: 100vh;
  }

  #buttonbar button{

  margin:-2px;

}
</style>