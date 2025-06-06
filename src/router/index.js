import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import RequestPasswordReset from '@/views/RequestPasswordReset.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import AppLayout from '@/components/AppLayout.vue'
import Product from '@/views/Product.vue'
import { useUserStore } from '@/stores/userStore'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      name: 'app',
      component: AppLayout,

      // Handle Unauth users to redirect to login page
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'app.dashboard',
          component: Dashboard,
        },
        {
          path: 'products',
          name: 'app.products',
          component: Product,
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      meta: {
        requiresGuest: true,
      },
      component: Login,
    },
    {
      path: '/request-password',
      name: 'requestPassword',
      meta: {
        requiresGuest: true,
      },
      component: RequestPasswordReset,
    },
    {
      path: '/reset-password/:token',
      name: 'resetPassword',
      meta: {
        requiresGuest: true,
      },
      component: ResetPassword,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notfound',
      component: NotFound,
    },
  ],
})

// Handle Unauth users to redirect to login page
// to(Target Route) = This is the route the user wants to visit.
// from(Current Route) = This is the page the user is currently on, before navigating.
// next(Decide what to do) = What to do next (let them go or block)
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  //  Not logged in user is trying to access protected page, so it redirects to login page
  if (to.meta.requiresAuth && !userStore.token) {
    next({ name: 'login' })
  }
  // Block access to guest pages: if user is logged in, they cannot go to route that has requiresGuest
  else if (to.meta.requiresGuest && userStore.token) {
    next({ name: 'app.dashboard' })
  }
  // No meta → public page run normally
  else {
    next()
  }
})
export default router
