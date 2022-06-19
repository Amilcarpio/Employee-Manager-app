import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import NovoEmpregado from '@/components/NovoEmpregado.vue'
import ViewEmpregado from '@/components/ViewEmpregado.vue'
import EditEmpregado from '@/components/EditEmpregado.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },

    { 
        path: '/novo-funcionario',
        name: 'novo-funcionario',
        component: NovoEmpregado
    },

    {
        path: '/:func_id',
        name: 'view-empregado',
        component: ViewEmpregado
    },

    {
        path: '/edit/:func_id',
        name: 'edit-empregado',
        component: EditEmpregado
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
