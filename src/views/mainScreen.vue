<!-- <template>
    <div>
      <h1>Hello, world!</h1>
      <div class="text-center mb-5">
                          <v-btn rounded color="teal accent-3" dark @click="test()">
                            Pieslēgties
                          </v-btn>
                        </div>
    </div>
  </template>
  
  <script>
  import { api } from "@/services/api";
  import { getApiBaseUrl } from "@/services/api"
  export default {
  data() {
    return {
      
    };
  }, -->
  <template>
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in items" :key="index" cols="6">
          <v-card>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
          
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { api } from '@/services/api';
  import { getApiBaseUrl } from '@/services/api';
  export default {
    data() {
      return {
        items: [
          { title: 'card', description: 'card desc' },
          { title: 'Card', description: 'card desc' },
          { title: 'Card', description: 'card desc' },
          { title: 'Card', description: 'card desc' },
          { title: 'Card', description: 'card desc' },
          { title: 'Card', description: 'card desc' }
          
        ]
      }
    },
  
  
  mounted() {
    getApiBaseUrl()
  
    
  },
  watch: {
   
  },

  methods: {
    test(){
      api.getStats()
    }
  }  
};

  </script>
