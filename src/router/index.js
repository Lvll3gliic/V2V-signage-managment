import { createRouter, createWebHistory } from 'vue-router'


import loginScreen from '../views/loginScreen.vue'
import mainScreen from '../views/mainScreen.vue'
import CustomPreMadeScreen from '../views/customPreMadeScreen.vue'
import CustomMadeScreen from '../views/customMadeScreen.vue'
import addFileScreen from '../views/addFileScreen.vue'
import MakePlaylistScreen from '../views/makePlaylistScreen.vue'
import AssetsScreen from '../views/assetsScreen.vue'
import playlistScreen from '../views/playlistScreen.vue'
import playlistDetails from '../views/playlistDetailsScreen.vue'
import settingsScreen from '../views/settingsScreen.vue'

import { auth } from '@/stores/auth'
const routes = [
    
    {
        path: '/',
        component: mainScreen,
    },
    {
        path:'/login',
        component: loginScreen, 
    },
    {
        path: '/add-playlist',
        component: MakePlaylistScreen,
    },
    {
        path: '/custom-made',
        component: CustomMadeScreen,
    },
    {
        path: '/custom-premade',
        component: CustomPreMadeScreen,
    },
    {
        path: '/add-file',
        component: addFileScreen,
    },
    {
        path: '/assets', 
        component: AssetsScreen, 
    },
    {
        path: '/playlists', 
        component: playlistScreen, 
    }, 
    { path: '/playlist/:id', 
    name: 'playlist-detail', 
    component: playlistDetails, 
    props: true 
    },
    {
        path: '/settings', 
        component: settingsScreen
    } 

  
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
 router.beforeEach((to, from) => {
     if(auth.is_authenticated == false && to.path != "/login"){
         return "/login";
     }else if(auth.is_authenticated == true && to.path == "/login"){
         return from ? from.path : "/login"; 
     }

})




export default router