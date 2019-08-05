<template>
  <div id="app" class="flex justify-content align-items">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
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
