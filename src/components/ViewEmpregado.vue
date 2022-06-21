<template>
<div class="container">
  <div id="view-empregado" class="card mt-5">
      <div class="card-header bg-primary text-white text-center">
        <h3> {{ nome }} </h3>
      </div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">Cargo: {{ cargo }}</li>
        <li class="list-group-item">Setor: {{ setor }}</li>
        <li class="list-group-item">ID#: {{ func_id }}</li>
      </ul>
      <div class="d-flex">
          <router-link to="/" class="btn btn-warning col sm-4 m-2 text-white">Voltar</router-link>
          <a 
          v-on:click="deletarEmpregado" 
          class="btn btn-danger col sm-4 m-2 text-white">
          Apagar
          </a>
          <router-link v-bind:to="{name:'edit-empregado', params: loadData()}" class="btn btn-primary col sm-4 m-2 text-white">Editar</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'view-employee',
    data () {
      return {
        func_id: null,
        nome: null,
        setor: null,
        cargo: null
      }
    },
    // capturando os dados para dentro do router antes de renderizar o componente
    beforeRouteEnter (to, from, next) {
      db.collection('empregados').where('func_id', '==', to.params.func_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.func_id = doc.data().func_id
            vm.nome = doc.data().nome
            vm.setor = doc.data().setor
            vm.cargo = doc.data().cargo
          })
        })
      })
    },
    // executando o fetching de dados do banco de dados
    whatch: {
        '$route': 'loadData'
    },
    // capturando os dados da API
    methods: {
      loadData () {
        db.collection('empregados').where('func_id', '==', this.$route.params.func_id).get().then((querySnapshot) => {
          querySnapshot.forEach(
            (doc) => {
              this.nome = doc.data().nome
              this.func_id = doc.data().func_id
              this.setor = doc.data().setor
              this.cargo = doc.data().cargo
            }
          )
        })
      },
      // Apagando os dados do funcionário do banco de dados
      deletarEmpregado(){
          if(confirm ('Deseja excluir os dados do sistema?')){
            db.collection('empregados').where('func_id', '==', this.$route.params.func_id).get().then((querySnapshot) => {
              querySnapshot.forEach(
                (doc) => {
                  db.collection('empregados').doc(doc.id).delete()
                  this.$router.push('/')
                }
              )
            })
          }
        }
      },

    }
</script>

<style scoped>
  .container {
    width: 100%;
  }
</style>
