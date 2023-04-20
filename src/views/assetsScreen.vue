<template>
     <v-container class="mt-10"  fluid>
      <v-row align="center" justify="center">
        <v-col cols="11" md="7"> 
            <div class="text-center mb-15">
                <h1>Pievienoto failu saraksts</h1>
                <p>desc</p>
            </div>
          </v-col>
        </v-row>
      </v-container>

  <v-container class="mb-5">
    <v-card v-for="file in fileList" :key="file.name" :class="`pa-3 project`" flat>
      <v-row>
        <v-col xs="1" sm="2" md="1">
          <div class="text-disabled">Bilde</div>
          <div @click="openImage(file.name)" style="cursor: pointer">
          <v-img :src= "`https://lvll3gliic.pisignage.com${file.thumbnail}?token=${apiKey}`" width="64" height="36" />
          </div>
        </v-col>
        <v-col xs="10" md="4">
          <div class="text-disabled">Faila nosaukums</div>
          <div>{{ file.name }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Atskaņošanas saraksts</div>
          <div>{{ file.playlists }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Ilgums</div>
          <div>{{ file.duration }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
            <div class="text-center mb-5">
                    <v-btn  color="teal accent-3" dark @click="deleteFile(file.name)">
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
  import { api } from "@/services/api";
  import { getApiBaseUrl } from "@/services/api"
  export default {
  data() {
    return {
      fileList: {},
      apiKey:""
    };
  },
  mounted() {
    getApiBaseUrl(), 
    api.getFiles()
      .then(response => {
        this.fileList = response;
        this.apiKey = localStorage.getItem("apiToken")
      })
      .catch(error => {
        console.log(error);
      });
    
  },
  watch: {
   
  },

  methods: {
    openImage(name) {
      window.open(`https://lvll3gliic.pisignage.com/media/lvll3gliic/${name}?token=${this.apiKey}`, '_blank', 'height=600,width=800')
    }, 
    deleteFile(fileName){
      api.deleteFile(fileName)
      .then(response=>{
        console.log(response)
      })
    }
  }  
};

  </script>