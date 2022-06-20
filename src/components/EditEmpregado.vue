<template>
  <div id="containermt"> 
    <h3 class="mt-2">Preencha o formulário abaixo:</h3>

    <div class="form-group bg-primary p-5 text-white">
      <form  @submit.prevent="updateFuncionario" class="col-s-12">

        <div class="form-group">
          <label>ID Funcionário #:</label>
          <input class="form-control form-control-md" type="text" v-model="func_id" required>
        </div>

        <div class="form-group">
          <label>Nome:</label>
          <input class="form-control form-control-md" type="text" v-model="nome" required>
        </div>

        <div class="form-group">
          <label>Cargo:</label>
          <input class="form-control form-control-md" type="text" v-model="cargo" required>
        </div>

        <div class="form-group">
          <label>Setor:</label>
          <input class="form-control form-control-md" type="text" v-model="setor" required>
        </div>  

         <button type="submit" class="btn btn-success">Salvar</button> 
         <router-link to="/" class="btn btn-danger ml-3">Cancelar</router-link>
      </form>

    </div>

  </div>
</template>

<script>
import db from './firebaseInit'
export default {
name: 'edit-empregado',
    data () {
        return {
          func_id: null,
          nome: null,
          cargo: null,
          setor: null,
        }
    },

    methods: {
      // capturar dados do formulário e salvar no banco de dados
      updateFuncionario(){
        db.collection('empregados').where('func_id', '==', this.$route.params.func_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) =>{
            doc.ref.update({
              func_id: this.func_id,
              nome: this.nome,
              cargo: this.cargo,
              setor: this.setor,
            })
            .then(() => {
              console.log('Document updated');
              this.$router.push({ name: 'edit-empregado', params: { func_id: this.func_id }});
            })
          })
        })
      }
    }
}
</script>
