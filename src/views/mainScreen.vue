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
    <v-container class="mt-10"  fluid>
      <v-row align="center" justify="center">
        <v-col cols="11" md="7"> 
            <div class="text-center mb-15">
                <h1>Televizoru sarakts</h1>
                <p>desc</p>
            </div>
          </v-col>
        </v-row>
      </v-container>

    <v-container>
      <v-row>
        <v-col v-for="(item, index) in players" :key="index" cols="6">
          <v-card class="text-center">
            <v-card-title class="text-center font-weight-bold">{{ item.name }}</v-card-title>
            <template v-if="item.tvStatus">
              <v-card-subtitle>Šobrīd tiek attēlots: </v-card-subtitle>
              <v-card-text>{{ item.currentPlaylist }}</v-card-text>
              <v-card-actions class="justify-center">
                <v-btn  color="teal accent-3" dark @click="controlTv(false ,item._id)">
                        IZSLĒGT
                    </v-btn>
              </v-card-actions>
          </template>
          <template v-else>
            <v-card-text>Televizors pašlaik ir izslēgts</v-card-text>
            <v-card-actions class="justify-center">
                <v-btn  color="teal accent-3" dark @click="controlTv(true,item._id)">
                        IESLĒGT
                    </v-btn>
            </v-card-actions>
          </template>
          <div :style="{
              height: '100%',
              width: '4px',
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: item.tvStatus ? 'green' : 'red'}"
          >
          </div>
          
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
        players : []
      }
    },
  
  
  mounted() {
    getApiBaseUrl()
    api.getStatistics()
    .then(response=>{
      console.log(response)
      for(const player of response){
        console.log(player)
        this.players.push(player)
      }
    })
    .catch(error =>{
      console.log(error)
    })
    
  },
  watch: {
   
  },

  methods: {
    controlTv(status, id){
      api.controlTv(status, id)
    }
  }  
};

  </script>

  