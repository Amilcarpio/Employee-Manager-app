<template>
  <div id="container-fluid">
    <div class="card-header bg-primary text-white mt-4">
            <h4>Funcionários</h4>
    </div>
    <ul class="card">
        <div class="card-body">
            <ul v-for="empregado in empregados" :key="empregado.id" class="list-group">
                <li class="list-group-item"> {{ empregado.nome }} </li>
                <li class="list-group-item"> {{ empregado.setor }} </li>
                <li class="list-group-item"> {{ empregado.func_id }} </li>
                <!-- Bindando parametros no router para cada id -->
                <router-link 
                v-bind:to="{ name: 'view-empregado', params: { func_id: empregado.func_id }}" class="btn-floating btn-large red">
                <label> Ver mais </label>
                </router-link>
            </ul>
        </div>
    </ul>

    <div class="fixed-action-btn">
        <router-link to="/novo-funcionario" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
        <label> Adicionar novo funcionário </label>
        </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data() {
        return {
            empregados: [],
        }
    },
    created() {
        // capturando dados do banco de dados
        db.collection('empregados').orderBy('setor').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'func_id': doc.data().func_id,
                    'nome': doc.data().nome,
                    'setor': doc.data().setor,
                    'cargo': doc.data().cargo,
                }
                this.empregados.push(data)
            })
        })
    },

}
</script>

<style>
    .container{
        width: 50%;
    }
</style>