<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PrimeTree msg="OBSIDIAN FRONTEND TREE APP"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PrimeTree from './components/PrimeTree.vue';

@Component({
  components: {
    PrimeTree,
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  background: #eaeaea;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app > img {
  max-width: 140px;
}
</style>
