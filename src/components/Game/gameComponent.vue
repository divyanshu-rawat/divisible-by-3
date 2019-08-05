<template>
  <div class="container game-card-wrapper">
    <div class="row title">
      <h4>User: {{ this.username }}</h4>
    </div>

    <div v-for="player in playerDetails" :key="player['.key']" class="player-info-wrapper">
      <div class="row">
        <div class="col-sm-3 text-center" v-if="player['username'] === username">
          <img src="../../assets/avatar.png" alt="player['username']" style="width: 3rem">
        </div>
        <div class="col-sm-3 text-center" v-if="player['username'] !== username"></div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <div class="mb-0">
                <p v-if="player['expression']" style="font-size: 16px;">{{player['expression']}}</p>
                <strong>{{player['number']}}</strong>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 text-center" v-if="player['username'] !== username">
          <img src="../../assets/avatar_.png" alt="player['username']" style="width: 3.5rem">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playerRef } from "../../rtdb-firebase/db.js";

export default {
  name: "GameComponent",
  data() {
    return {
      username: "",
      playerDetails: []
    };
  },
  created() {
    this.username = this.$store.state.username;
    if (!this.username) {
      this.$router.push("/");
    }
  },
  firebase: {
    playerDetails: playerRef
  }
};
</script>

<style scoped>
.game-card-wrapper {
  width: 30%;
  margin: 3em 0 4em 0;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2), 0 4px 18px 0 rgba(0, 0, 0, 0.19);
  padding-bottom: 1em;
}
.title {
  padding: 2em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #1599e6;
}
.player-info-wrapper {
  margin-bottom: 70px;
  margin-top: 2em;
}
</style>