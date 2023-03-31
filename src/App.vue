<template>
  <v-app >
    <NavigationBar v-show="auth.is_authenticated"/>
    <v-main >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import NavigationBar from './components/NavigationBar.vue';
import router from './router'
import { auth } from "./stores/auth";

export default {
  name: 'App',
  router,

  components: {
    NavigationBar,
  },

  data(){
   return{
    auth,
   } //
  },
}
</script>
