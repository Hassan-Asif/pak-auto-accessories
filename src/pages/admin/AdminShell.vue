```vue
<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">

    <!-- ================= SIDEBAR ================= -->
    <aside
      class="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950 md:flex"
    >

      <!-- Brand -->
      <div class="border-b border-zinc-800 px-5 py-6">

        <RouterLink
          to="/admin"
          class="block text-xl font-black tracking-tight text-white"
        >
          Neon<span class="text-zinc-500">LEDs</span>
          <span class="ml-1 text-xs font-bold uppercase tracking-widest text-zinc-600">
            Admin
          </span>
        </RouterLink>

        <p class="mt-2 text-xs text-zinc-500">
          Store management dashboard
        </p>

      </div>


      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-3 py-5">

        <p
          class="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600"
        >
          Management
        </p>


        <RouterLink
          to="/admin"
          exact
          class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          active-class="bg-white text-black hover:bg-white hover:text-black"
        >
          <span class="text-base">
            ▦
          </span>

          Dashboard
        </RouterLink>


        <RouterLink
          to="/admin/products"
          class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          active-class="bg-white text-black hover:bg-white hover:text-black"
        >
          <span class="text-base">
            ◈
          </span>

          Products
        </RouterLink>


        <RouterLink
          to="/admin/orders"
          class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          active-class="bg-white text-black hover:bg-white hover:text-black"
        >
          <span class="text-base">
            □
          </span>

          Orders
        </RouterLink>


        <div class="my-5 border-t border-zinc-900"></div>


        <p
          class="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600"
        >
          Store
        </p>


        <RouterLink
          to="/"
          class="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
        >
          <span class="text-base">
            ↗
          </span>

          Storefront
        </RouterLink>

      </nav>


      <!-- Bottom -->
      <div class="border-t border-zinc-800 p-4">

        <button
          type="button"
          class="flex w-full items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
          @click="logout"
        >
          Logout
        </button>

      </div>

    </aside>


    <!-- ================= MOBILE HEADER ================= -->
    <header
      class="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl md:hidden"
    >

      <div class="flex items-center justify-between px-4 py-4">

        <RouterLink
          to="/admin"
          class="text-lg font-black tracking-tight text-white"
        >
          Neon<span class="text-zinc-500">LEDs</span>
          <span class="ml-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
            Admin
          </span>
        </RouterLink>


        <button
          type="button"
          class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800"
          @click="logout"
        >
          Logout
        </button>

      </div>


      <!-- Mobile Navigation -->
      <nav
        class="flex gap-2 overflow-x-auto border-t border-zinc-900 px-4 py-3"
      >

        <RouterLink
          to="/admin"
          exact
          class="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-400 transition"
          active-class="bg-white text-black"
        >
          Dashboard
        </RouterLink>


        <RouterLink
          to="/admin/products"
          class="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-400 transition"
          active-class="bg-white text-black"
        >
          Products
        </RouterLink>


        <RouterLink
          to="/admin/orders"
          class="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-400 transition"
          active-class="bg-white text-black"
        >
          Orders
        </RouterLink>


        <RouterLink
          to="/"
          class="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-zinc-400 transition"
        >
          Storefront ↗
        </RouterLink>

      </nav>

    </header>


    <!-- ================= MAIN ================= -->
    <main class="min-h-screen md:pl-64">

      <div class="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">

        <slot />

      </div>

    </main>

  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()


async function logout() {
  try {
    await auth.logout()
  } finally {
    router.push('/admin/login')
  }
}
</script>
```
