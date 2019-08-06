<template>
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
</template>

<script>
export default {
  name: "PlayerStatsComponent",
  props: {
    player: Object,
    username: String
  }
};
</script>

<style>
</style>