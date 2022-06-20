<template>
  <!-- login form -->
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="login card-panel blue white-text center">
                <h3>Login</h3>
                    <form>
                        <div class="input-field">
                            <i class="material-icons prefix">Email</i>
                            <input type="text" id="email" v-model="email">
                            <label for="email">Email</label>
                        </div>

                        <div class="input-field">
                            <i class="material-icons prefix">Lock</i>
                            <input type="password" id="password" v-model="password">
                            <label for="password">Password</label>
                        </div>
                        <button @click="logar" class="btn btn-large grey lighteen-4 black-text">Login</button>
                    </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
        }
    },

    methods: {
        //logando o usuário no sistema
        logar: function(e) {
            e.preventDefault()
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert(`Usuário ${user.email} logado com sucesso!`)
                this.$router.push('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`${errorMessage}, ${errorCode}`)
            });
        }
    }
}
</script>
