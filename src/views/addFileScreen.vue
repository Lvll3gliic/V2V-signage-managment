<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" md="7">
        <div class="text-center mb-15">
          <h1>Pievieno failu</h1>
          <p>
            Šajā ekrānā ir iepēja pievienot failu kādam no esošajiem
            atskaņošanas sarakstiem.
          </p>
        </div>

        <v-form>
          <v-file-input
            label="Failu pievienošana"
            id="file"
            ref="file"
            @change="getType"
            color="secondary"
            title="Spiežot uz šī lauka ir iespējams izvēlēties failu no datora atmiņas, ko vēlaties pievienot atskaņošanas sarakstam"
          >
          </v-file-input>
          <v-select
            v-model="selectedOption"
            label="Select"
            :items="playlistList"
            item-title="name"
            item-value="name"
            return-object
            single-line
            color="secondary"
            prepend-icon="mdi-form-select"
          ></v-select>

          <v-text-field
            label="Atspoguļošanas ilgums sekundēs"
            name="duration"
            prepend-icon="mdi-clock"
            type="number"
            color="secondary"
            v-model="duration"
            :disabled="isVideo"
            title="Spiežot uz šī lauka ir iespējams izvēlēties laiku sekundēs, cik ilgi šis fails rādīsies uz ekrāna katru reizi"
          />

          <div class="text-center mb-5">
            <v-btn
              color="secondary"
              dark
              @click="postFile()"
              style="margin-right: 10px"
            >
              pievienot
            </v-btn>
          </div>
          
          <v-alert v-model="successAlert" type="success" dismissible>
            Fails veiksmīgi pievienots!
          </v-alert>
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
      file: [],
      selectedOption: "Izvēlies atskaņošanas sarakstu",
      playlistList: [],
      duration: "",
      isVideo: false,
      successAlert: false,
    };
  },
  mounted() {
    getApiBaseUrl(),
      api
        .getPlaylists()
        .then((response) => {
          this.playlistList = response;
        })
        .catch((error) => {
          console.log(error);
        });
  },
  watch: {
    options() {
      this.selectedOption = this.playlistList[0];
    },
  },

  methods: {
    deploy() {
      api.deployPlaylist();
    },
    postFile() {
      const img = this.$refs.file.files[0];
      console.log(this.selectedOption);
      api.uploadFile(img, this.selectedOption, this.duration)
        .then(() => {
          this.successAlert = true;
          setTimeout(() => {
            this.successAlert = false;
          }, 5000); 
        })
        .catch((error) => {
          console.error("Failu neizdevās pievienot. Kļūda:", error);
          
        });
    },
    getPlaylists() {
      api.getPlaylists();
    },
    getType(event) {
      const file = event.target.files[0];
      const fileType = file.type;
      if (fileType.startsWith("video/")) {
        this.isVideo = true;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          const video = document.createElement("video");
          video.src = reader.result;

          video.addEventListener("loadedmetadata", () => {
            this.duration = video.duration;
          });
        });

        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
