import axios from 'axios';
import {auth} from '../stores/auth'
import { reactive } from 'vue'


export const apiBuilder = axios.create({
  
});

export function setApiBaseUrl(link) {
  const url = `https://${link}.pisignage.com/api`;
  console.log(url);
  apiBuilder.defaults.baseURL = url;
  localStorage.setItem("apiBaseUrl", url);
  
}

export function getApiBaseUrl() {
  const apiUrl = localStorage.getItem("apiBaseUrl");
  console.log(apiUrl)
  if (apiUrl) {
    apiBuilder.defaults.baseURL = apiUrl;
  }
}

export const api = reactive({

  async getToken(email, password){
    const headers={
      email: email,
      password: password, 
      getToken:"true"
    }
    try{
      const response = await apiBuilder.post('/session', headers); 
      console.log(response)
      localStorage.setItem("apiToken",response.data.token)
      var apiToken = response.data.token
      const fileInfo = await apiBuilder.get(`/files?token=${apiToken}`)
        if (fileInfo.status == 200) {
           auth.authenticate();
        }

    }catch(error){
      return error; 
      
    }
  },

  async uploadFile(file, playlist, duration){
    const formData = new FormData();
    formData.append('file', file);
    let headers = {
      headers: {
        'content-Type': 'multipart/form-data'
      }
    }
    try{
      var apiToken = localStorage.getItem("apiToken") 
      const response = await apiBuilder.post(`/files?token=${apiToken}`, formData, headers)
      console.log(response.data)
      this.postUpload(file)
      this.addToPlaylist(playlist, file.name, duration)
    }catch(error){
      console.error(error); 
    }
  },

  async postUpload(file){
    const headers={
      files:[{
        "name": file.name,
        "type": file.type,
        "size": file.size,
      }]
    }
    try{
      var apiToken = localStorage.getItem("apiToken")
      const response = await apiBuilder.post(`/postupload?token=${apiToken}`, headers); 
      console.log(response)
    }catch(error){
      console.error(error);
      
    }
  },
  async getPlaylists(){
    try{
      var apiToken = localStorage.getItem("apiToken")
      const response = await apiBuilder.get(`/playlists?token=${apiToken}`)
      const playlistList = []
      for(const i of response.data.data){
        playlistList.push(i.name)
      }
      return playlistList
    }catch(error){
      console.error(error);
    }

  },
  async getDetailedPlaylists (name){
    try{
      const apiToken = localStorage.getItem("apiToken")
      const url = name ? `/playlists/${name}?token=${apiToken}` : `/playlists?token=${apiToken}`
      const response = await apiBuilder.get(url)
      const playlistDetails = name ? [response.data.data] : response.data.data
      return playlistDetails
    } catch(error){
      console.error(error);
    }
  },
  async addToPlaylist(playlistName, assetsName, duration){
    const headers = {
      'Content-Type': 'application/json',
      'duration': duration
    };
    
    const data = {
      assets: [
        {
          filename: `${assetsName}`,
          selected: 'true', 
          duration: `${duration}`,
        },
      ],
    };
    
    try {
      const apiToken = localStorage.getItem('apiToken');
      const playlistInfo = await apiBuilder.get(`/playlists/${playlistName}?token=${apiToken}`);
      for (const i of playlistInfo.data.data.assets) {
        data.assets.push({ filename: i.filename, selected: i.selected, duration: i.duration });
      }
      const response = await axios.post(`https://lvll3gliic.pisignage.com/api/playlists/${playlistName}?token=${apiToken}`, data, { headers });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },

  async uploadHtmlFile(templateName, heading, text, playlist, duration,file_name){
    const headers={
      template: `${templateName}`,
      heading: `${heading}`,
      paragraph: `${text}`,
    }
    try{
      const response = await axios.post("http://localhost:3001/api/update-html-file", headers)
      this.getUpdatedHtmlFile(templateName, heading, text, playlist, duration, file_name) 
      console.log(response)
    }catch(error){
      console.error(error);
      
    }

  }, 

  async getUpdatedHtmlFile(templateName, heading, text, playlist, duration, file_name){
    try{
      axios.get(`http://localhost:3001/api/get-html-file/${templateName}&${heading}&${text}`)
      .then((responseHtml) => {
          console.log("RESPONSE: " + responseHtml.data.html)
          const blob = new Blob([responseHtml.data.html], { type: "text/html" });
          const htmlFile = new File([blob], `${file_name}.html`, { type: "text/html" });
          this.uploadFile(htmlFile, playlist, duration);
        })
    }catch(error){
      console.error(error);
      
    }
  },



async addPlaylist(playlistName){
  const headers={
    file: playlistName
  }
  try{
    var apiToken = localStorage.getItem("apiToken")
    await apiBuilder.post(`/playlists?token=${apiToken}`,headers)
    
  }catch(error){
    console.error(error);
    
  }
},

// async controlTv(status){

//   try{
//     var apiToken = localStorage.getItem("apiToken")
//     const response = await axios.get(`https://lvll3gliic.pisignage.com/api/players?token=${apiToken}`)
//     for(const i of response.data.data.objects){
//       let headers={
//         'status': status, 
//       }
//       const test = await axios.post(`https://lvll3gliic.pisignage.com/api/pitv/${i._id}?token=${apiToken}`, headers)
//       console.log(test)
//     }
//   }catch(error){
//     console.error(error);
    
//   }
// },
async controlTv(status, id){
  try{
    let headers={
            'status': status, 
    }
    var apiToken = localStorage.getItem("apiToken")
    const test = await axios.post(`https://lvll3gliic.pisignage.com/api/pitv/${id}?token=${apiToken}`, headers)
    console.log(test)
      
  }catch(error){
    console.error(error);
        
  }
},
  



async getFiles(){
  try{
    var apiToken = localStorage.getItem("apiToken")
    const response = await apiBuilder.get(`/files?token=${apiToken}`)
    const filesList = []
    console.log("assets")
    console.log(response)
    for(const i of response.data.data.dbdata){
      filesList.push(i)
      console.log(i)
    }
    return filesList
  }catch(error){
    console.error(error);
  }

},

async getFileDetails(fileName){
  try{
    var apiToken = localStorage.getItem("apiToken")
    const response = await apiBuilder.get(`/files/${fileName}?token=${apiToken}`)
    
    return response.data.data
  }catch(error){
    console.error(error);
  }
}, 

async deleteFile(fileName){
  var apiToken = localStorage.getItem("apiToken") // replace with the actual file URL
  axios.delete(`https://pisignage.com/api/files/${fileName}?token=${apiToken}`)

  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error deleting file:', error);
  });

}, 

async getStatistics(){
  try{
    var apiToken = localStorage.getItem("apiToken")
    const response = await apiBuilder.get(`/screens?token=${apiToken}`)
    console.log(response)
    return response.data.data.objects
  }catch(error){
    console.error(error);
  }
}, 
async deletePlaylist(playlistName){
 
  const data = {
    playlist: playlistName,
    assets: [
      {
      },
    ],
  };
  
  try {
    const apiToken = localStorage.getItem('apiToken');
    const response = await apiBuilder.post(`/playlistfiles?token=${apiToken}`, data);
    console.log(response)
  } catch (error) {
    console.error(error);
  }
},
})


