import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import NovoEmpregado from '@/components/NovoEmpregado.vue'
import ViewEmpregado from '@/components/ViewEmpregado.vue'
import EditEmpregado from '@/components/EditEmpregado.vue'
import Login from '@/components/Login.vue'
import Registre from '@/components/Registre.vue'
import { getAuth } from "firebase/auth"

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/registre',
        name: 'registre',
        component: Registre,
        meta: {
            requiresGuest: true
        }
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },

    { 
        path: '/novo-funcionario',
        name: 'novo-funcionario',
        component: NovoEmpregado,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/:func_id',
        name: 'view-empregado',
        component: ViewEmpregado,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/edit/:func_id',
        name: 'edit-empregado',
        component: EditEmpregado,
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router

router.beforeEach((to, from, next) => {
    // check for required authentication guard
    if(to.matched.some(record => record.meta.requiresAuth)){
        // check if user is not logged in
        if(!getAuth().currentUser){
            //redirect to login page
            next({
                path: '/login',
                query: { 
                    redirect: to.fullPath 
                }
            })
        }else {
            // proceed to route
            next()
        };

    } else if(to.matched.some(record => record.meta.requiresGuest)){
        // check if user is logged in
        if(getAuth().currentUser){
            //redirect to dashboard page
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                } 
            })
        }else {
            // proceed to route
            next()
        }
    } else {
        // proceed to route
        next()
    }
})
