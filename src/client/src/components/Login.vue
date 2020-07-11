<template>
  <v-layout row wrap justify-center align-center class="main">
    <v-layout row wrap justify-center align-center class="main" v-if="hasAccount">
      <v-card color="grey">
        <v-card-title primary-title>
          <h2 class="black--text">Entre na sua conta</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field color="white" label="Email" v-model="loginData.email"></v-text-field>
          <v-text-field color="white" label="Senha" type="password" v-model="loginData.password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center>
            <v-btn class="ma-30" color="success" @click="login()">Logar</v-btn>
            <v-btn class="ma-30" color="warning" @click="hasAccount = false">Cadastrar-se</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-dialog
        v-model="deleteNoteAsk"
        :overlay="false"
        max-width="300px"
        transition="scale-transition"
      >
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
    </v-layout>
    <v-layout row wrap justify-center align-center class="main" v-else>
      <v-card color="indigo darken-2">
        <v-card-title primary-title>
          <h2 class="white--text">Criar sua conta</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field color="white" label="Nome" v-model="registerData.name"></v-text-field>
          <v-text-field color="white" label="Email" v-model="registerData.email"></v-text-field>
          <v-text-field color="white" label="Senha" type="password" v-model="registerData.password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center class="ma-30">
            <v-btn color="success" class="ma-30" @click="hasAccount = true">Logar</v-btn>
          </v-layout>
          <v-layout>
            <v-dialog>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" class="ma-30" dark v-bind="attrs" v-on="on" @click="register()">Registrar</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Registro criado</v-card-title>
                <v-card-text>Cadastro criado, faça login</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="this.modaldialog = false">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hasAccount: true,
      loginData: new Object(),
      registerData: new Object()
    };
  },
  methods: {
    login() {
      var data = {
        email: this.loginData.email,
        password: this.loginData.password
      };

      axios.post("http://localhost:3000/api/login", data).then(res => {
        var user = res.data.user;
        if (user != null) {
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/user");
        }
      });
    },
    register() {
      var data = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password
      };

      axios.post("http://localhost:3000/api/users", data).then(res => {
        console.log(res.data.user);
      });
    }
  }
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  background-color: #ffffff;
}

.ma-30{
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
}
</style>