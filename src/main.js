import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getAuth, onAuthStateChanged } from "firebase/auth";

//mantendo a mesma página aberta pós refresh
let app;
getAuth().onAuthStateChanged(user =>{
    if(!app){
        app = createApp(App).use(store).use(router).mount('#app')
    }
})


