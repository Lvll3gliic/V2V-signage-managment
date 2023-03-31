import axios from 'axios';
import {auth} from '../stores/auth'
import { reactive } from 'vue'
let apiBuilder = axios.create({
});

export function setApiBaseUrl(link){
 
  var url = `https://lvll3gliic.pisignage.com/api`
  console.log(link)
  apiBuilder.defaults.baseURL=url
  console.log(apiBuilder.defaults.baseURL)
  localStorage.setItem("apiBaseUrl", url)

}
export function getApiBaseUrl(){
  console.log("RELOAD")
  const apiUrl = localStorage.getItem("apiBaseUrl")
  if(apiUrl){
    apiBuilder.defaults.baseURL = apiUrl
  }
}
window.addEventListener("load", getApiBaseUrl)

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
    const headers={
      assets: [
        {
        'filename' : `${assetsName}`,
        'selected' : 'true', 
        'duration': `${duration}`,
      },
      ],
    }
    try{
      var apiToken = localStorage.getItem("apiToken")
      const playlistInfo = await apiBuilder.get(`/playlists/${playlistName}?token=${apiToken}`)
      for(const i of playlistInfo.data.data.assets){
        headers.assets.push({'filename': i.filename, 'selected': i.selected, 'duration': i.duration})
      }
      await axios.post(`https://lvll3gliic.pisignage.com/api/playlists/${playlistName}?token=${apiToken}`,headers)
    }catch(error){
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

    
    
    
  //  async uploadHtmlFiles(templateName, heading, text, playlist, duration,file_name ){
      
  //     const data = {
  //       template: `${templateName}`,
  //       heading: `${heading}`,
  //       paragraph: `${text}`,
       
  //     };
      
      
  //     axios
  //       .post("http://localhost:3001/api/update-html-file", data)
  //       .then((response) => {
  //         console.log(response)
  //         this.getUpdatedHtmlFile(templateName, heading, text, playlist, duration, file_name)
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
      
  //   },
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


// async getUpdatedHtmlFiles(templateName, heading, text, playlist, duration, file_name){
//   axios
//         .get(`http://localhost:3001/api/get-html-file/${templateName}&${heading}&${text}`)
//         .then((responseHtml) => {
//           console.log("RESPONSE: " + responseHtml.data.html)
//           const blob = new Blob([responseHtml.data.html], { type: "text/html" });
//           const htmlFile = new File([blob], `${file_name}.html`, { type: "text/html" });
//           this.uploadFile(htmlFile, playlist, duration);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
// },
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

async controlTv(status){

  try{
    var apiToken = localStorage.getItem("apiToken")
    const response = await axios.get(`https://lvll3gliic.pisignage.com/api/players?token=${apiToken}`)
    for(const i of response.data.data.objects){
      let headers={
        'status': status, 
      }
      const test = await axios.post(`https://lvll3gliic.pisignage.com/api/pitv/${i._id}?token=${apiToken}`, headers)
      console.log(test.data)
    }
  }catch(error){
    console.error(error);
    
  }
},

async controlTvs(status){
  var apiToken = localStorage.getItem("apiToken");
  const controlTv = await axios.get(`https://lvll3gliic.pisignage.com/api/players?token=${apiToken}`)
  for(const i of controlTv.data.data.objects){
    let config={
      'status': status, 
    }
    const test = await axios.post(`https://lvll3gliic.pisignage.com/api/pitv/${i._id}?token=${apiToken}`, config)
    console.log(test.data)
  }

  

},

async getFiles(){
  try{
    var apiToken = localStorage.getItem("apiToken")
    const response = await apiBuilder.get(`/files?token=${apiToken}`)
    const filesList = []
    for(const i of response.data.data.dbdata){
      filesList.push(i)
      console.log(i)
    }
    return filesList
  }catch(error){
    console.error(error);
  }

},
})


