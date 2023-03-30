<template>
    <div>
      <h1>Hello, world!</h1>
      
    </div>
  </template>
  
  <script>
  //import { api } from "@/services/api";
  import { getApiBaseUrl } from "@/services/api"
  export default {
  data() {
    return {
      
    };
  },
  mounted() {
    getApiBaseUrl()
  
    
  },
  watch: {
   
  },

  methods: {
  }  
};

  </script>
