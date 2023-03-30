<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="11" md="7"> 
            <div class="text-center mb-15">
                <h1>Pievieno failu</h1>
                <p>desc</p>
            </div>
           
            <v-form>
                <v-file-input 
                label="Failu pievienošana"
                id="file" 
                ref="file" 
                @change="getType">
                </v-file-input>
                <v-select
                    v-model="selectedOption" 
                    label="Select"
                    :items="playlistList"
                    item-title="name"
                    item-value="name"
                    return-object
                    single-line
                    color="teal accent-3"
                    prepend-icon="mdi-form-select"
                >                    
                </v-select>
                <v-text-field
                    label="Atspoguļošanas ilgums"
                    name="duration"
                    prepend-icon="mdi-clock"
                    type="number"
                    color="teal accent-3"
                    v-model="duration"
                    :disabled="isVideo"
                />
    
                <div class="text-center mb-5">
                          <v-btn  color="teal accent-3" dark @click="postFile()">
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


export default {
  data() {
    return {
      file: [],
      selectedOption: "",
      playlistList: [],
      duration: "",
      isVideo:false
    };
  },
  mounted() {
  
    api.getPlaylists().then((options) => {
      this.playlistList = options;
    });
  },
  watch: {
    options() {
      this.selectedOption = this.playlistList[0];
    },
  },

  methods: {
    postFile() {
      const img = this.$refs.file.files[0];
      console.log(this.selectedOption);
      api.uploadFile(img, this.selectedOption, this.duration);
    },
    getPlaylists() {
      api.getPlaylists();
    },
    getType(event){
     const file = event.target.files[0]
      const fileType = file.type;
      if(fileType.startsWith('video/')){
        this.isVideo = true; 
        const reader = new FileReader();

      reader.addEventListener('load', () => {
        const video = document.createElement('video');
        video.src = reader.result;

        video.addEventListener('loadedmetadata', () => {
          this.duration = video.duration
        });
      });

      reader.readAsDataURL(file);
    }
    }
  },
};
</script>
