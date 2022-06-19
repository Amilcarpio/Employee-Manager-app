<template>
  <div id="novo-empregado">  
    <h3>Preencha o formulário abaixo:</h3>

    <div class="row">

      <form  @submit.prevent="saveFuncionario" class="col-s-12">

        <div class="form-group row">
          <label>ID Funcionário #:</label>
          <input class="form-control form-control-md" type="text" v-model="func_id" required>
        </div>

        <div class="form-group row">
          <label>Nome:</label>
          <input class="form-control form-control-md" type="text" v-model="nome" required>
        </div>

        <div class="form-group row">
          <label>Cargo:</label>
          <input class="form-control form-control-md" type="text" v-model="cargo" required>
        </div>

        <div class="form-group row">
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
    name: 'NovoEmpregado',
    data() {
        return {
          func_id: null,
          nome: null,
          cargo: null,
          setor: null,
        }
    },

    methods: {
      // capturar dados do formulário e salvar no banco de dados
      saveFuncionario(){
        db.collection('empregados').add({
          func_id: this.func_id,
          nome: this.nome,
          cargo: this.cargo,
          setor: this.setor,
        }).then(docRef => {
          console.log('Document written with ID: ', docRef.id);
          this.$router.push('/');
        }).catch(error => {
          console.error('Error adding document: ', error);
        });
      }
    }
}
</script>
