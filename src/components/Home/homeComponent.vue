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
export default {
  name: "HomeComponent",
  data() {
    return {
      username: "",
      alert: false,
      warning: false
    };
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