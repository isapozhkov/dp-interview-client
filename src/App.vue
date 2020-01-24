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
</style>
