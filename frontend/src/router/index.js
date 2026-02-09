import { createRouter, createWebHistory } from 'vue-router'


const userRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/User/DashboardView.vue'),
  },
  {
    path: '/detail/:ticketId',
    name: 'TicketDetail',
    component: () => import('@/views/User/TicketDetailView.vue'),
  },
];

const adminRoutes = [
  {
    path: '/attendance',
    name: 'AttendanceList',
    component: () => import('@/views/Admin/AttendanceListView.vue'),
  },
];

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  ...userRoutes,
  ...adminRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
