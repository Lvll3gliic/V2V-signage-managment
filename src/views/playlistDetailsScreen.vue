<template>
     <v-container class="my-5">
    <v-card v-for="file in fileList" :key="file.name" :class="`pa-3 project`" flat>
      <v-row>
        <v-col xs="1" sm="2" md="1">
          <div class="text-disabled">Bilde</div>
          <div @click="openImage(file.path)" style="cursor: pointer">
            <v-img :src= "`https://lvll3gliic.pisignage.com${file.path}?token=${apiKey}`" width="64" height="36" />
          </div>        
        </v-col>
        <v-col xs="10" md="4">
          <div class="text-disabled">Faila nosaukums</div>
          <div>{{ file.name }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Atskaņošanas saraksts</div>
          <div>{{ file.name}}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Ilgums</div>
          <div>{{ file?.dbdata?.duration }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
            <div class="text-center mb-5">
                    <v-btn  color="teal accent-3" dark @click="test()">
                        Dzēst
                    </v-btn>
                </div>
        </v-col>
      </v-row>
      <v-divider />
    </v-card>
  </v-container>
  </template>
  
  <script>
  
import {api} from '../services/api'
import { getApiBaseUrl } from "@/services/api"
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        playlist: {}, 
        fileList:[],
        fileNames:[],
        apiKey:""
      };
    },
    methods:{
    async getFileDetails(){
      this.apiKey = localStorage.getItem("apiToken")
      await this.getPlaylistDetails(); 
      
      for(const name of this.fileNames){
        try {
          const response = await api.getFileDetails(name);
          console.log(response)
          this.fileList.push(response)


      } catch(error) {
        console.log(error);
      }
      }
    },
    async getPlaylistDetails(){
      try {
        const response = await api.getDetailedPlaylists(this.id);
        
        this.playlist = response[0];
        console.log(response[0].assets[0])
        for(const i of response[0].assets){
          this.fileNames.push(i.filename)
          console.log("assets" + i.filename) 
        }
      } catch(error) {
        console.log(error);
      }
    }, 
    openImage(path) {
      window.open(`https://lvll3gliic.pisignage.com${path}?token=${this.apiKey}`, '_blank', 'height=600,width=800')
    }
  },
  async mounted() {
    getApiBaseUrl(),
    await this.getFileDetails(); 
  }
};
  </script>