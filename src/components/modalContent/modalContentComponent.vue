<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" v-if="winner" id="loserModalLabel">Congratulations !</h5>
        <h5 class="modal-title" v-if="!winner" id="loserModalLabel">Sorry !</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body flex flex-col align-items">
        <img src="../../assets/lost.png" v-if="!winner" class="img-fluid winner-loser-img">
        <img src="../../assets/won.png" v-if="winner" class="img-fluid winner-loser-img">
        <br>
        <br>
        <h3 v-if="winner">You Won!</h3>
        <h3 v-if="!winner">You Lost!</h3>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          @click="newGame()"
          data-dismiss="modal"
        >Play Again?</button>
        <button type="button" data-dismiss="modal" class="btn btn-secondary" @click="Quit()">Quit</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../vue-event-bus/event-bus.js";

export default {
  name: "ModalContentComponent",
  data() {
    return {
      winner: false
    };
  },
  props: ["Quit", "newGame"],
  created() {
    EventBus.$on("win-lose-status", evt => {
      this.winner = evt;
    });
  }
};
</script>

<style scoped>
.winner-loser-img {
  display: block;
  border: none;
  outline: none;
  text-decoration: none;
  width: 100px;
}
</style>