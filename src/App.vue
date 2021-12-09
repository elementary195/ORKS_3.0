<template>
  <v-app>
    <div id="app">
      <AppHeader/>
        <v-app>
          <router-view/>
        </v-app>
    </div>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import Vue from "vue";
export default {
  name: 'App',
  components: {AppHeader}
}
Vue.mixin({
  methods: {
    mDefineUserStatus(val) {

    },
    mDefineTaskStatus(val) {

    }
  }
})
</script>

<style>

</style>
