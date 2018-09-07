<template>
  <div id="app">
    <v-app>
      <CcHome/>
    </v-app>
  </div>
</template>

<script>
import CcHome from './components/Home'

export default {
  name: 'App',
  components: {
    CcHome
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
