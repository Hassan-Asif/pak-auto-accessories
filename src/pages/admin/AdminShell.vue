<template>
  <div class="min-h-screen bg-zinc-950">
    <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-800 bg-ink p-5 md:block">
      <RouterLink to="/admin" class="text-xl font-black">NeonLEDs<span class="text-brake">Admin</span></RouterLink>
      <nav class="mt-8 grid gap-2">
        <RouterLink class="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900" to="/admin">Dashboard</RouterLink>
        <RouterLink class="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900" to="/admin/products">Products</RouterLink>
        <RouterLink class="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900" to="/admin/orders">Orders</RouterLink>
        <RouterLink class="rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900" to="/">Storefront</RouterLink>
      </nav>
      <button class="btn-secondary mt-8 w-full" @click="logout">Logout</button>
    </aside>
    <main class="md:pl-64">
      <div class="border-b border-zinc-800 bg-ink p-4 md:hidden">
        <RouterLink to="/admin" class="font-black">NeonLEDs Admin</RouterLink>
      </div>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function logout() {
  await auth.logout()
  router.push('/admin/login')
}
</script>
