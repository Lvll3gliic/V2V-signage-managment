<template>
    <nav>
      <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-img :src="logo" width="90" height="90"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="white" @click="auth.logout()">
          <span>Atslēgties</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app color="primary" dark>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
           
              <v-list-item-title>{{ link.text }}</v-list-item-title>
           
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </template>
  
  <script>
  import router from '@/router';
  import { auth } from "../stores/auth.js";
  export default {
    
    data() {
      return {
        auth,
        drawer: false,
        router,
        links: [
          {  text: 'Statistika', route: '/'},
          {  text: 'Pievienot failu', route: '/add-file' },
          {  text: 'Izveido pats', route: '/custom-made' },
          {  text: 'Gatavi template', route: '/custom-premade' },
          {  text: 'Izveidot Playlisti', route: '/add-playlist' },
          {  text: 'Pievienoto failu saraksts', route: '/assets' },
          {  text: 'Atskaņošanas saraksti', route: '/playlists'}
          
        ], 
        logo: require('@/assets/v2v_logo.png')
      }
    }
  }
  </script>
  