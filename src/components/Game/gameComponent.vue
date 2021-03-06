<template>
  <div class="app-wrapper" style="width:100%">
    <div class="container game-card-wrapper">
      <div class="row title">
        <h4>User: {{ this.username }}</h4>
      </div>

      <div v-for="player in playerDetails" :key="player['.key']" class="player-info-wrapper">
        <player-stats-component :player="player" :username="username"></player-stats-component>
      </div>

      <div class="row justify-content" v-if="!winner && !loser">
        <div class="col-sm-3 choices-wrapper" @click="operationPerformed('-1')">
          <span class="choices float-right">-1</span>
        </div>
        <div class="col-sm-4 flex justify-content choices-wrapper" @click="operationPerformed('0')">
          <span class="choices">0</span>
        </div>
        <div class="col-sm-3 choices-wrapper" @click="operationPerformed('1')">
          <span class="choices">1</span>
        </div>
      </div>
    </div>
    <div class="flex col-lg-12 justify-content">
      <transition name="fade">
        <div
          class="alert alert-danger"
          role="alert"
          v-if="warning"
        >Please wait for your opponent to respond!</div>
      </transition>
    </div>

    <!-- Winner Modal Start-->

    <!-- Modal -->
    <div
      class="modal fade"
      id="winnerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="winnerModalLabel"
      aria-hidden="true"
    >
      <modal-content-component :Quit="Quit" :newGame="newGame"></modal-content-component>
    </div>

    <!-- Winner Modal End -->

    <!-- Loser Modal Start -->

    <div
      class="modal fade"
      id="loserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loserModalLabel"
      aria-hidden="true"
    >
      <modal-content-component :Quit="Quit" :newGame="newGame"></modal-content-component>
    </div>

    <!-- Loser Modal End -->
  </div>
</template>

<script>
import { playerRef, databaseURL } from "../../rtdb-firebase/db.js";
import PlayerStatsComponent from "../PlayerStats/playerStatsComponent";
import ModalContentComponent from "../modalContent/modalContentComponent";
import EventBus from "../../vue-event-bus/event-bus.js";
import axios from "axios";

export default {
  name: "GameComponent",
  data() {
    return {
      username: "",
      playerDetails: [],
      winner: false,
      loser: false,
      warning: false
    };
  },
  components: {
    "player-stats-component": PlayerStatsComponent,
    "modal-content-component": ModalContentComponent
  },
  created() {
    this.username = this.$store.state.username;
    if (!this.username) {
      this.$router.push("/");
    }
  },
  updated: function() {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  },
  firebase: {
    playerDetails: playerRef
  },
  /* Vue does provide a generic way to observe and react to data changes on a Vue instance. */
  watch: {
    playerDetails: function(response) {
      const length = response.length;
      if (length > 0) {
        if (response[length - 1]["number"] == 1) {
          if (response[length - 1]["username"] === this.username) {
            this.winner = true;
            this.showModal("winner");
          } else {
            this.loser = true;
            this.showModal("loser");
          }
          EventBus.$emit("win-lose-status", this.winner);
        }
      }
    }
  },

  methods: {
    operationPerformed(selectedNumber) {
      if (selectedNumber) {
        let length = this.playerDetails.length;
        if (length > 0) {
          if (this.playerDetails[length - 1]["username"] !== this.username) {
            let newNumber = Math.floor(
              (Number(this.playerDetails[length - 1]["number"]) +
                Number(selectedNumber)) /
                3
            );
            let divisor =
              Number(this.playerDetails[length - 1]["number"]) +
              Number(selectedNumber);

            if (newNumber < 1) {
              newNumber = 1;
            }
            playerRef.push({
              username: this.username,
              number: newNumber,
              selectedNumber: selectedNumber,
              expression: "[" + String(divisor) + "/" + 3 + "] = " + newNumber
            });
          } else {
            this.warning = true;
            setTimeout(() => {
              this.warning = false;
            }, 2000);
          }
        }
      }
    },
    showModal(status) {
      if (status === "winner") {
        // eslint-disable-next-line
        $("#winnerModal").modal({
          backdrop: "static",
          keyboard: false
        });
      } else {
        // eslint-disable-next-line
        $("#loserModal").modal({
          backdrop: "static",
          keyboard: false
        });
      }
    },

    Quit() {
      location.reload(true);
    },
    newGame() {
      if (this.playerDetails.length === 1) {
        this.winner = false;
        this.loser = false;
        const length = this.playerDetails.length;
        const newNumber = Math.floor(
          Number(this.playerDetails[length - 1]["number"]) / 3
        );
        const divisor = Number(this.playerDetails[length - 1]["number"]);

        playerRef.push({
          username: this.username,
          number: newNumber,
          expression: "[" + String(divisor) + "/" + 3 + "] = " + newNumber
        });
      } else if (this.playerDetails.length > 1) {
        axios({
          method: "delete",
          url: databaseURL
        }).then(() => {
          const number = Math.floor(Math.random() * 900) + 100;
          playerRef.push({
            username: this.username,
            number: number,
            exp: null
          });
          this.winner = false;
          this.loser = false;
        });
      }
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.game-card-wrapper {
  width: 50%;
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
.choices-wrapper {
  cursor: pointer;
  text-align: center;
}
.choices {
  height: 3.5em;
  width: 3.5em;
  background-color: #50aadd;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dot:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>