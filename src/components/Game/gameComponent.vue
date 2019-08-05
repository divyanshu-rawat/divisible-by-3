<template>
  <div class="container game-card-wrapper">
    <div class="row title">
      <h4>User: {{ this.username }}</h4>
    </div>
  </div>
</template>

<script>
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
</style>