<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="11" md="7"> 
            <div class="text-center mb-15">
                <h1>Izveido jaunu atskaņošanas sarakstu</h1>
                <p>desc</p>
            </div>
           
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
                    <v-btn  color="teal accent-3" dark @click="addPlaylist()">
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
      name: "",
    };
  },
  methods: {
    addPlaylist() {
     api.addPlaylist(this.name)
    },
  },
};
</script>