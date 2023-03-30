<template>
    <v-app>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="5" md="5">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="11" md="11">
                        <v-card-text class="mt-12 text-center">
                
                          <h1 class=" display-2 teal--text text--accent-3 mb-5">
                            Pieslēdzies
                          </h1>
  
                          <v-form>
                            <v-select
                            v-model="selectedZone" 
                            @update:modelValue="emitSelected"
                            label="Select"
                            :items="zones"
                            item-title="name"
                            item-value="zone"
                            return-object
                            single-line
                            color="teal accent-3"
                            prepend-icon="mdi-form-select"
                            >
                                
                            </v-select>
                            <v-text-field
                              label="e-pasts"
                              name="Email"
                              prepend-icon="mdi-email"
                              type="text"
                              color="teal accent-3"
                              v-model="email"
                            />
  
                            <v-text-field
                              id="parole"
                              label="Password"
                              name="password"
                              prepend-icon="mdi-lock"
                              type="password"
                              color="teal accent-3"
                              v-model="password"
                            />
                          </v-form>
                   
                        </v-card-text>
  
                        <div class="text-center mb-5">
                          <v-btn rounded color="teal accent-3" dark @click.prevent="submitForm">
                            Pieslēgties
                          </v-btn>
                        </div>
                        
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  
  <script>
//import axios from "axios";
//import { auth } from "../stores/auth";
//import router from "../router/index";
import { api } from "../services/api";
import { setApiBaseUrl } from "../services/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      api,
      selectedZone: "",
      errorMessage: "",
      zones: [
          { name: 'Testa vide', zone: 'lvll3gliic' },
          { name: 'Skola', zone: 'skola' },
          ]
    };
  },
  methods: {
    async submitForm() {
        console.log(this.selectedZone.zone)
      try{
        const response = await api.getToken(this.email, this.password);
        if(response.success){
          console.log("suc")
        }else{
          this.errorMessage = "Nepareizs lietotājvārds un/vai parole!";
        }
      }catch(error){
        //console.error(error);
        this.errorMessage = "An error occurred while logging in.";
      }
      
    },
    emitSelected(){
        setApiBaseUrl(this.selectedZone.zone)
      
    }
  },
  mounted() {
    
      
  },
};
</script>
