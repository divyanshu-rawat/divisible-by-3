<template>
  <div class="container">
    <div class="row justify-content">
      <img src="../../assets/takeAwayLogo.png" alt>
    </div>

    <div class="row justify-content">
      <p class="title">Welcome to Game of Three 👋</p>
    </div>
    <div class="row justify-content">
      <div class="alert alert-primary col-lg-3" role="alert" v-if="alert">Processing...</div>
    </div>

    <div class="row justify-content">
      <div class="col-lg-3 col-md-4 col-sm-8">
        <label class="sr-only" for="Username">Username</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">@</div>
          </div>
          <input
            type="text"
            class="form-control"
            v-bind:class="{ 'is-invalid': warning }"
            id="Username"
            placeholder="Username"
            v-model="username"
          >
          <div class="invalid-feedback" v-if="warning">Please provide a username to proceed.</div>
        </div>
      </div>
      <div class>
        <button type="button" @click="startGamePlay()" class="btn btn-primary mb-2">START</button>
      </div>
    </div>
  </div>
</template>

<script>
import { playerRef, databaseURL } from "../../rtdb-firebase/db.js";
import axios from "axios";

export default {
  name: "HomeComponent",
  data() {
    return {
      username: "",
      alert: false,
      warning: false
    };
  },
  created() {
    if (this.$store.state.username) {
      this.$router.push("/play");
    }
  },
  firebase: {
    playerDetails: playerRef
  },
  methods: {
    startGamePlay() {
      if (this.username) {
        this.alert = true;
        this.$store.dispatch("setUsername", this.username);
        if (this.playerDetails.length === 1) {
          this.$router.push("/play");
        } else {
          axios({
            method: "delete",
            url: databaseURL
          }).then(response => {
            const randomNumber = Math.floor(Math.random() * 900) + 100;
            playerRef
              .push({
                username: this.username,
                number: randomNumber,
                exp: null
              })
              .then(response => {
                this.$router.push("/play");
              });
          });
        }
      } else {
        this.warning = true;
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 2em;
  color: rgb(255, 137, 1);
  font-weight: 600;
}
</style>