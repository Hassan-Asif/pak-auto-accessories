import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, firebaseReady } from '../firebase/config'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue'), meta: { title: 'Neon LEDs' } },
  { path: '/categories', component: () => import('../pages/CategoriesPage.vue'), meta: { title: 'Categories | Neon LEDs' } },
  { path: '/products', component: () => import('../pages/ProductListingPage.vue'), meta: { title: 'Products | Neon LEDs' } },
  { path: '/products/:id', component: () => import('../pages/ProductDetailsPage.vue'), meta: { title: 'Product Details | Neon LEDs' } },
  { path: '/cart', component: () => import('../pages/CartPage.vue'), meta: { title: 'Cart | Neon LEDs' } },
  { path: '/checkout', component: () => import('../pages/CheckoutPage.vue'), meta: { title: 'Checkout | Neon LEDs' } },
  { path: '/order-confirmation/:id', component: () => import('../pages/OrderConfirmationPage.vue'), meta: { title: 'Order Confirmation | Neon LEDs' } },
  { path: '/admin/login', component: () => import('../pages/admin/LoginPage.vue'), meta: { title: 'Admin Login | Neon LEDs' } },
  { path: '/admin', component: () => import('../pages/admin/DashboardPage.vue'), meta: { requiresAdmin: true, title: 'Admin Dashboard | Neon LEDs' } },
  { path: '/admin/products', component: () => import('../pages/admin/ProductManagementPage.vue'), meta: { requiresAdmin: true, title: 'Manage Products | Neon LEDs' } },
  { path: '/admin/orders', component: () => import('../pages/admin/OrderManagementPage.vue'), meta: { requiresAdmin: true, title: 'Manage Orders | Neon LEDs' } }
]

const router = createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })

function currentUser() {
  return new Promise((resolve) => {
    if (!auth) {
      resolve(null)
      return
    }
    const off = onAuthStateChanged(auth, (user) => {
      off()
      resolve(user)
    })
  })
}

router.beforeEach(async (to) => {
  document.title = to.meta.title || 'Neon LEDs'
  if (!to.meta.requiresAdmin) return true
  if (!firebaseReady) return '/admin/login'
  const user = await currentUser()
  if (!user) return `/admin/login?redirect=${encodeURIComponent(to.fullPath)}`
  const adminDoc = await getDoc(doc(db, 'admins', user.uid))
  return adminDoc.exists() ? true : '/admin/login'
})

export default router
