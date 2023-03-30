import { reactive } from 'vue'
import router from '@/router';

export const auth = reactive({
    
    is_authenticated: localStorage.is_authenticated ?? false,

    authenticate() {

        console.log(this.is_authenticated)
        localStorage.is_authenticated = true;
        this.is_authenticated = true;
        console.log(this.is_authenticated)
        router.push('/')
    },
    logout(){
        localStorage.clear()
        this.is_authenticated = false; 
        router.push('/login')

    }
    
})