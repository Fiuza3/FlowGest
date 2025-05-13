import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/Dashboard.vue';
import Units from '@/pages/Units.vue';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/units', component: Units },
  { path: '/employees', component: () => import('@/pages/Employees.vue') },
  { path: '/notes', component: () => import('@/pages/Notes.vue') },
  { path: '/finance', component: () => import('@/pages/Finance.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
