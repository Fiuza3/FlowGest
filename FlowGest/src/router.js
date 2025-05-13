import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import HomeView from './views/HomeView.vue'
import EstoqueView from './views/EstoqueView.vue'
import Opcao2 from './views/Opcao2.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomeView },
      { path: '/estoque', component: EstoqueView },
      { path: 'opcao2', component: Opcao2 },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
