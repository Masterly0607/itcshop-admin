import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layout
import AppLayout from '@/components/layouts/AppLayout.vue'

// Pages
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/product/Products.vue'
import Categories from '@/views/categories/Categories.vue'
import Orders from '@/views/orders/Orders.vue'
import Customers from '@/views/customers/Customers.vue'
import Users from '@/views/users/Users.vue'
import Coupons from '@/views/coupons/Coupons.vue'

// Auth Pages
import Login from '@/views/auth/Login.vue'
import RequestPasswordReset from '@/views/auth/RequestPasswordReset.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

// Error Page
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/app',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'app.dashboard', component: Dashboard }, //  Dashboard (stats)
        { path: 'products', name: 'app.products', component: Products }, //  Manage products
        { path: 'categories', name: 'app.categories', component: Categories }, //  Manage categories
        { path: 'orders', name: 'app.orders', component: Orders }, //  Manage orders
        { path: 'customers', name: 'app.customers', component: Customers }, // Manager customers
        { path: 'users', name: 'app.users', component: Users }, // Manage users
        { path: 'coupons', name: 'app.coupons', component: Coupons }, //  Manage coupons
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: '/request-password',
      name: 'requestPassword',
      component: RequestPasswordReset,
      meta: { requiresGuest: true },
    },
    {
      path: '/reset-password/:token',
      name: 'resetPassword',
      component: ResetPassword,
      meta: { requiresGuest: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound,
    },
  ],
})

// ✅ Navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.token) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && userStore.token) {
    next({ name: 'app.dashboard' })
  } else {
    next()
  }
})

export default router
