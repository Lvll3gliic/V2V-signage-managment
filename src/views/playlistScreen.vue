<template>
  <v-container class="mt-10" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" md="7">
        <div class="text-center mb-15">
          <h1>Atskaņošanas saraksti</h1>
          <p>
            Šeit tiek atspoguļoti visi atskaņošanas sarkasti, kas ir pievienoti
          </p>
          <p>
            Spiežot uz uz katra no tiem, atvērsies šī atskaņošanas saraksta
            detaļas
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="mb-5">
    <v-card
      v-for="playlist in playlists"
      :key="playlist.name"
      :class="`pa-3 project`"
      flat
      @click="goToPlaylistDetail(playlist)"
    >
      <v-row>
        <v-col xs="10" md="4">
          <div class="text-disabled">Saraksta nosaukums</div>
          <div>{{ playlist.name }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Izkārtojums</div>
          <div>{{ playlist.templateName }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-disabled">Sākuma-beigu datumi</div>
          <div>{{ playlist.schedule }}</div>
        </v-col>
        <v-col xs="6" sm="4" md="2">
          <div class="text-center mb-5">
          <v-btn @click.stop="deletePlaylist(playlist.name)" color="error" dark>Dzēst</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider />
    </v-card>
  </v-container>
</template>
<script>
import { api } from "@/services/api";
import { getApiBaseUrl } from "@/services/api";
export default {
  data() {
    return {
      playlists: {},
      apiKey: "",
    };
  },
  mounted() {
    this.fetchPlaylists();
  },
  methods: {
    fetchPlaylists() {
      getApiBaseUrl(),
      api
        .getDetailedPlaylists()
        .then((response) => {
          this.playlists = response;
          this.apiKey = localStorage.getItem("apiToken");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToPlaylistDetail(playlist) {
      this.$router.push({
        name: "playlist-detail",
        params: { id: playlist.name },
      });
    },
    async deletePlaylist(playlistName) {
      try {
        await api.deleteFile(`__${playlistName}.json`);
        // Reload playlists data after successful deletion
        this.fetchPlaylists();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>