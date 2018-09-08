<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title>My Home Automation</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>

        <v-layout row wrap>
          <v-flex xs3>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Lampada 1</div>
                <div>desligar ou ligar a lampada 1 da casa</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark v-on:click="turnOnLight">Ligar</v-btn>
                <v-btn flat dark v-on:click="turnOffLight">Desligar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        {{slider}}
        <v-flex xs12>
          <v-slider
            v-model="slider"
            thumb-label="always"
          ></v-slider>
        </v-flex>

      </v-container>
    </v-content>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  name: 'CcHome',
  data () {
    return {
      slider: 100
    }
  },
  methods: {
    turnOnLight () {
      $socket.emit('turnOnlight', true)
    },
    turnOffLight () {
      $socket.emit('turnOnlight', false)
    }
  },
  created () {
    let vm = this
    $socket.on('potenciometer', v => {
      vm.$data.slider = v
    })
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
