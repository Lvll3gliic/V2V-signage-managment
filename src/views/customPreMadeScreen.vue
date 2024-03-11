<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="11" md="7"> 
            <div class="text-center mb-15">
                <h1>Izveido jaunu no sagatavotajiem template</h1>
                <p>desc</p>
            </div>
           
            <v-form>
                <v-select
                    label="Templeita izvēle"
                    v-model="template"
                    :items="templates"
                    item-title="name"
                    item-value="name"
                    return-object
                    
                    color="teal accent-3"
                    prepend-icon="mdi-form-select"
                >                    
                </v-select>
                <v-text-field
                    label="Faila nosaukums"
                    name="file_name"
                    prepend-icon="mdi-file"
                    type="text"
                    color="teal accent-3"
                    v-model="file_name" 
                />
                <v-text-field
                    label="Virsraksts"
                    name="heading"
                    prepend-icon="mdi-text"
                    type="text"
                    color="teal accent-3"
                    v-model="heading"
                />
                <v-text-field
                    label="Teksts"
                    name="text"
                    prepend-icon="mdi-text"
                    type="text"
                    color="teal accent-3"
                    v-model="text"
                />
                <v-select
                    v-model="selectedOption" 
                    label="Atskaņošanas saraksts"
                    :items="playlistList"
                    item-title="name"
                    item-value="name"
                    return-object
                    color="teal accent-3"
                    prepend-icon="mdi-form-select"
                >                    
                </v-select>

                <v-text-field
                    label="Atspoguļošanas ilgums"
                    name="Email"
                    prepend-icon="mdi-clock"
                    type="number"
                    color="teal accent-3"
                    v-model="duration"
                />
    
                <div class="text-center mb-5">
                    <v-btn  color="teal accent-3" dark class="mx-4" @click="postHtml()">
                        Priekškatīt
                    </v-btn>

                    <v-btn  color="teal accent-3" dark class="mx-4" @click="postHtml()">
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
import { getApiBaseUrl } from "@/services/api"
export default {
  data() {
    return {
      file: "",
      selectedOption: "",
      playlistList: [],
      duration: "",
      heading: "",
      text: "",
      template: "",
      file_name: "",
      templates:["template_1", "Template2", "Template3"]
    };
  },

  methods: {
    postHtml() {
      api.uploadHtmlFile(
        this.template,
        this.heading,
        this.text,
        this.selectedOption,
        this.duration,
        this.file_name
      );
    },
  },
  watch: {
    options() {
      this.selectedOption = this.playlistList[0];
    },
  },
  mounted() {
    getApiBaseUrl(),
    api.getPlaylists().then((options) => {
      this.playlistList = options;
    });
  },
};
</script>
