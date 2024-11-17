<script>
import KanbanBoard from './components/KanbanBoard.vue'

export default {
  name: 'App',
  components: {
    KanbanBoard
  }
}
</script>

<template>
  <KanbanBoard />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
