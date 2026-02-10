import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/authService'
import { useAuthStore } from '@/stores/auth'

const userRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/User/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/detail/:id',
    name: 'TicketDetail',
    component: () => import('@/views/User/TicketDetailView.vue'),
    meta: { requiresAuth: true },
  },
]

const adminRoutes = [
  {
    path: '/attendance',
    name: 'AttendanceList',
    component: () => import('@/views/Admin/AttendanceListView.vue'),
  },
]

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return next('/dashboard')
  }

  next()
})

export default router
