<template>
  <div id="app">
    <HomeComponent />
  </div>
</template>

<script>
import HomeComponent from './components/Home/homeComponent'

export default {
  name: "app",
  components: {
    HomeComponent
  },
};
</script>

<style>
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.justify-content {
  justify-content: center;
}
.align-items {
  align-items: center;
}

body {
  font-family: serif;
}
</style>
