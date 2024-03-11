<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" md="7">
        <div class="text-center mb-15">
          <h1>Izveido jaunu atskaņošanas sarakstu</h1>
          <p>Šajā ekranā ir iespēja pievienot jaunu atskaņošanas sarakstu.</p>
          <p>
            Ievadi atskaņošanas saraksta nosaukumu un spied pogu "pievienot".
            Tādā veidā tiks izveidots jauns atskaņošanas saraksts.
          </p>
        </div>
        <v-alert v-model="successAlert" type="success" dismissible class="mb-5">
          Atskaņošanas saraksts "{{ addedPlaylistName }}" veiksmīgi pievienots.
        </v-alert>
        <v-form>
          <v-text-field
            label="Atskaņošanas saraksta nosaukums"
            name="file_name"
            prepend-icon="mdi-playlist-edit"
            type="text"
            color="teal accent-3"
            v-model="file_name"
          />

          <div class="text-center mb-5">
            <v-btn color="teal accent-3" dark @click="addPlaylist()">
              pievienot
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { api } from "@/services/api";
import { getApiBaseUrl } from "@/services/api";

export default {
  data() {
    return {
      file_name: "",
      successAlert: false,
      addedPlaylistName: ""
    };
  },
  methods: {
    async addPlaylist() {
      try {
        await api.addPlaylist(this.file_name);
        // Set added playlist name for success alert
        this.addedPlaylistName = this.file_name;
        // Show success alert
        this.successAlert = true;
        // Clear input field after successful addition
        this.file_name = "";
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    getApiBaseUrl();
  },
};
</script>
