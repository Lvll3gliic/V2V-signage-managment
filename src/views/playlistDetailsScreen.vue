<template>
  <v-container class="mt-10" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" md="7">
        <div class="text-center mb-10">
          <h1>{{ this.id }}</h1>
          <h2>Failu saraksts</h2>
          <p>
            Šeit tiek atspoguļoti šajā ({{ this.id }}) atskaņošanas sarakstā
            pievienotie faili
          </p>
          
            

        </div>
      </v-col>
      
    </v-row>
    <v-row xs="8" sm="6" md="4" align="center" justify="center" >
      <div class="text-center mb-10">
        <div class="d-flex justify-center mx-auto">
         
          <v-btn
            color="teal accent-3"
            dark
            @click="deploy(this.id)"
          >
            Izvietot
          </v-btn>
        </div>
      </div>
    </v-row>
  </v-container>
  <div>
  <v-container class="my-5" v-if="fileList.length > 0">
    <v-card
      v-for="(file, index) in fileList"
      :key="file.name"
      :class="`pa-3 project`"
      flat
    >
      <v-row>
        <v-col xs="1" sm="2" md="1">
          <div class="text-disabled">Bilde</div>
          <div @click="openImage(file.path)" style="cursor: pointer">
            <template v-if="file?.dbdata?.thumbnail">
              <v-img
                :src="`https://girtsvanags.pisignage.com${file.dbdata.thumbnail}?token=${apiKey}`"
                width="64"
                height="36"
              />
            </template>
            <template v-else>
              <v-icon>mdi-image-off-outline</v-icon>
            </template>
          </div>
        </v-col>
        <v-col xs="10" md="4">
          <div class="text-disabled">Faila nosaukums</div>
          <div>{{ file.name }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Atskaņošanas saraksts</div>
          <div>{{ file.dbdata.playlists }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Ilgums</div>
          <div>{{ fileNames[index].duration }}</div>
        </v-col>

        <v-col xs="6" sm="4" md="2">
          <div class="text-center mb-5">
            <v-btn color="teal accent-3" dark @click="test()"> Dzēst </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider />
    </v-card>
  </v-container>
<div v-else>
  <p class="text-center">Atskaņošanas sarakstā nav pievienotu failu</p>
  </div>
  </div>
</template>

<script>
import { api } from "../services/api";
import { getApiBaseUrl } from "@/services/api";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      playlist: {},
      fileList: [],
      fileNames: [],
      apiKey: "",
      editedDuration: null,
    };
  },
  methods: {
    async getFileDetails() {
      this.apiKey = localStorage.getItem("apiToken");
      await this.getPlaylistDetails();

      for (const name of this.fileNames) {
        try {
          const response = await api.getFileDetails(name.filename);
          console.log(response);
          this.fileList.push(response);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getPlaylistDetails() {
      try {
        const response = await api.getDetailedPlaylists(this.id);

        this.playlist = response[0];
        console.log(response[0]);
        for (const i of response[0].assets) {
          this.fileNames.push(i);
          console.log("assets" + i);
        }
      } catch (error) {
        console.log(error);
      }
    },
    openImage(path) {
      window.open(
        `https://girtsvanags.pisignage.com${path}?token=${this.apiKey}`,
        "_blank",
        "height=600,width=800"
      );
    },
    deletePlaylist(playlistName){
      api.deleteFile(`__${playlistName}.json`)
    },
    deploy(playlistName){
      api.deployPlaylist(playlistName);
    }
  },
  async mounted() {
    getApiBaseUrl(), await this.getFileDetails();
  },
};
</script>
