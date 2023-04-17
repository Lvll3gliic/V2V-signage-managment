<template>
    

    <v-container class="my-5">
      <v-card v-for="playlist in playlists" :key="playlist.name" :class="`pa-3 project`" flat @click="goToPlaylistDetail(playlist)">
        <v-row>
          <v-col xs="10" md="4">
            <div class="text-disabled">Saraksta nosaukums</div>
            <div>{{ playlist.name }}</div>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="text-disabled">Izkārtojums</div>
            <div>{{ playlist.templateName}}</div>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="text-disabled">Sākuma-beigu datumi</div>
            <div>{{ playlist.schedule }}</div>
          </v-col>
        
        </v-row>
        <v-divider />
      </v-card>
    </v-container>
  </template>
  
       
  
    
    <script>
    import { api } from "@/services/api";
    import { getApiBaseUrl } from "@/services/api"
    export default {
    data() {
      return {
        playlists: {},
        apiKey:""
      };
    },
    mounted() {
      getApiBaseUrl(),
      api.getDetailedPlaylists()
        .then(response => {
          this.playlists = response;
          this.apiKey = localStorage.getItem("apiToken")
          console.log(response)
        })
        .catch(error => {
          console.log(error);
        });

      
    },
    watch: {
     
    },
  
    methods: {
        goToPlaylistDetail(playlist) {
            this.$router.push({ name: 'playlist-detail', params: { id:playlist.name  } })
        }
    }  
  };
  
    </script>