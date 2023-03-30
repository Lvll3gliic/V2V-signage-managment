<template>
    

  <v-container class="my-5">
    <v-card v-for="file in fileList" :key="file.name" :class="`pa-3 project`" flat>
      <v-row>
        <v-col xs="1" sm="2" md="1">
          <div class="caption grey--text">Bilde</div>
          <div><v-img :src= "`https://lvll3gliic.pisignage.com${file.thumbnail}?token=${apiKey}`" width="64" height="36" /></div>
        </v-col>
        <v-col xs="10" md="4">
          <div class="caption grey--text">Faila nosaukums</div>
          <div>{{ file.name }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Atskaņošanas saraksts</div>
          <div>{{ file.playlists }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="caption grey--text">Ilgums</div>
          <div>{{ file.duration }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
            <div class="text-center mb-5">
                    <v-btn  color="teal accent-3" dark @click="postHtml()">
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
  export default {
  data() {
    return {
      fileList: {},
      apiKey:""
    };
  },
  mounted() {
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
  }  
};

  </script>