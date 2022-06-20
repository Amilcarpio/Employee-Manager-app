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
                        <button @click="registre"  class="btn btn-large grey lighteen-4 black-text">Login</button>
                    </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'registre',
    data() {
        return {
            email: '',
            password: '',
        }
    },

    methods: {
        //registrando o novo usuário no banco de dados
        registre: function(e){
            e.preventDefault()
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert(`Usuário ${user.email} criado com sucesso!`)
                this.$router.go({ path: this.$router.path })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Erro: ${errorMessage}, código: ${errorCode}`)
            });
    }
    }
}
</script>

