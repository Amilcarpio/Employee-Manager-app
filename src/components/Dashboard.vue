<template>
  <div id="dashboard">
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>Funcionários</h4>
        </li>
        <li v-for="empregado in empregados" :key="empregado.id" class="collection-item">
            <div class="chip"> {{ empregado.setor }} </div>
            {{ empregado.func_id }}:{{ empregado.nome }}
            
            <!-- Bindando parametros no router para cada id -->
            <router-link 
            v-bind:to="{ name: 'view-empregado', params: { func_id: empregado.func_id }}" class="btn-floating btn-large red">
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
    </ul>

    <div class="fixed-action-btn">
        <router-link to="/novo-funcionario" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
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

</style>