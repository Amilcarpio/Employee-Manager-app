<template>
    <div id="view-empregado">
        <ul class="row d-flex">
            <li class="list-group col">
                <h6 class="list-group-item col-lg-4">{{ nome }}</h6>
                <h6 class="list-group-item col-lg-4">Cargo: {{ cargo }}</h6>
                <h6 class="list-group-item col-lg-4">Setor: {{ setor }}</h6>
                <h6 class="list-group-item col-lg-4">ID#: {{ func_id }}</h6>
            </li>
        </ul>
      <div class="row">
        <router-link to="/" class="btn btn-primary col-sm-6 mt-5">Voltar</router-link>
      </div>
      <div class="row">
        <button 
        v-on:click="deletarEmpregado" 
        class="btn btn-danger col-sm-6 mt-1">
        Apagar
        </button>
      </div>
      <div class="row">
        <router-link v-bind:to="{name:'edit-empregado', params: loadData()}" class="btn btn-primary col-sm-6 mt-5">Editar</router-link>
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


