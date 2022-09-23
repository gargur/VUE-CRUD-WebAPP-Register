import { createRouter, createWebHistory } from 'vue-router'
import RegisterFormView from '../views/RegisterFormView.vue'
import RegisterListView from '../views/RegisterListView.vue'
import RegisterEditView from '../views/RegisterEditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: RegisterFormView
  },
  {
    path: '/listadecadastros',
    name: 'Lista de Cadastros',
    component: RegisterListView
  },
  {
    path: '/editarcadastro',
    name: 'Editar Cadastro',
    component: RegisterEditView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
