<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
    <nav class="container-page flex h-20 items-center justify-between">

      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-2xl font-black tracking-tight text-zinc-900"
      >
        Neon<span class="text-zinc-400">LEDs</span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 lg:flex">

        <RouterLink
          to="/"
          class="font-medium text-zinc-700 transition hover:text-black"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/products"
          class="font-medium text-zinc-700 transition hover:text-black"
        >
          Products
        </RouterLink>

        <RouterLink
          to="/categories"
          class="font-medium text-zinc-700 transition hover:text-black"
        >
          Categories
        </RouterLink>

      </div>

      <!-- Search -->
      <div class="hidden w-full max-w-md lg:block">

        <input
          v-model="search"
          @keyup.enter="goToSearch"
          type="text"
          placeholder="Search products..."
          class="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-5 py-3 text-sm outline-none transition focus:border-black"
        />

      </div>

      <!-- Right Side -->
      <div class="hidden items-center gap-4 lg:flex">

        <div
          v-if="selectedVehicle"
          class="rounded-xl border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-700"
        >
          🚗 {{ selectedVehicle.displayName }}
        </div>

        <RouterLink
          to="/cart"
          class="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 transition hover:bg-zinc-100"
        >
          🛒

          <span
            v-if="cart.count"
            class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white"
          >
            {{ cart.count }}
          </span>

        </RouterLink>

        <RouterLink
          to="/products"
          class="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
        >
          Shop Now
        </RouterLink>

      </div>

      <!-- Mobile Button -->
      <button
        class="flex flex-col gap-1 lg:hidden"
        @click="open = !open"
      >
        <span class="h-0.5 w-6 bg-black"></span>
        <span class="h-0.5 w-6 bg-black"></span>
        <span class="h-0.5 w-6 bg-black"></span>
      </button>

    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="open"
      class="border-t border-zinc-200 bg-white lg:hidden"
    >

      <div class="container-page py-5">

        <input
          v-model="search"
          @keyup.enter="goToSearch"
          type="text"
          placeholder="Search products..."
          class="mb-5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3"
        />

        <div class="flex flex-col gap-5">

          <RouterLink @click="open = false" to="/">
            Home
          </RouterLink>

          <RouterLink @click="open = false" to="/products">
            Products
          </RouterLink>

          <RouterLink @click="open = false" to="/categories">
            Categories
          </RouterLink>

          <RouterLink @click="open = false" to="/cart">
            Cart ({{ cart.count }})
          </RouterLink>

          <RouterLink
            @click="open = false"
            to="/products"
            class="rounded-xl bg-black py-3 text-center font-semibold text-white"
          >
            Shop Now
          </RouterLink>

        </div>

      </div>

    </div>

  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'

const open = ref(false)
const search = ref('')
const cart = useCartStore()
const router = useRouter()

// Remove this if you aren't using a vehicle selector yet.
const selectedVehicle = null

function goToSearch() {
  router.push({
    path: '/products',
    query: {
      search: search.value
    }
  })

  open.value = false
}
</script>