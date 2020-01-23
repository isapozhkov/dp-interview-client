<template>
  <div id="app">
    <Searcher />
  </div>
</template>

<script>
import Searcher from "./components/Searcher";
export default {
  name: "app",
  components: {
    Searcher
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
