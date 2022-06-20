<template>
  <nav>
    <div class="navbar navbar-dark bg-primary">
      <div class="container"> 
        <ul class="right">
          <li v-if="isLoggedIn"><router-link to="/" class="brand-logo" style="color: white">Dashboard</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login" class="brand-logo" style="color: white">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/registre" class="brand-logo" style="color: white">Registre-se</router-link></li>
          <button v-if="isLoggedIn" @click="logout" class="btn btn-success">Logout</button>
          <li ></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },

  created(){
    if(getAuth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = getAuth().currentUser.email;
    }
  },

  methods:{
    logout(){
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.push('/login')
      })
    }
  }
}
</script>


