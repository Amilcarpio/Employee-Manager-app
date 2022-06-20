<template>
  <!-- login form -->
    <div class="container">
        <div class="card text-center bg-primary text-white mt-5">
            <div class="card-header">
                <h3>Login</h3>
            </div>
        <form>
            <div class="form-group row">
                <i class="material-icons prefix"></i>
                <label for="staticEmail" class="col-sm-2 col-form-label mt-2" >Email</label>
                <div class="col-sm-8">
                    <input type="staticEmail" class="form-control-plaintext text-white mt-2" id="email" placeholder="exemplo@email.com" v-model="email">
                </div>
            </div>

            <div class="form-group row">
                <i class="material-icons prefix"></i>
                <label for="staticEmail" class="col-sm-2 col-form-label mt-2" >Senha</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control-plaintext text-white mt-2" id="password" placeholder="senha" v-model="password">
                </div>
            </div>
            <button @click="logar" class="btn btn-lg mb-3 btn-light">Login</button>
        </form>
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
        logar(e) {
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

<style scoped>
.container {
    width: 70%;
}
</style>