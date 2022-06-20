<template>
  <nav>
    <div class="navbar navbar-expand-lg bg-primary navbar-white ">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <div class="nav-item">
              <li class="navbar-brand"  v-if="isLoggedIn"><router-link to="/" style="color: white">Dashboard</router-link></li>
            </div>
            <div class="nav-item">
              <li class="nav-link active" v-if="!isLoggedIn"><router-link to="/login" c style="color: white">Login</router-link></li>
            </div>
            <div class="nav-item">
              <li class="nav-link active" v-if="!isLoggedIn"><router-link to="/registre" style="color: white">Registre-se</router-link></li>
            </div>
            <form class="d-flex">
              <button v-if="isLoggedIn" @click="logout" class="btn btn-success me-2">Logout</button>
            </form>
            <li ></li>
          </ul>
        </div>
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


