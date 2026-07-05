<template>
  <header class="sticky top-0 z-40 border-b border-zinc-800 bg-ink/90 backdrop-blur">
    <nav class="container-page flex h-16 items-center justify-between gap-4">

      <!-- Logo -->
      <RouterLink to="/" class="text-lg font-black tracking-wide">
        Neon<span class="text-brake">LEDs</span>
      </RouterLink>

      <!-- Search (Desktop) -->
      <div class="hidden flex-1 md:flex md:justify-center">
        <input
          v-model="search"
          @keyup.enter="goToSearch"
          type="text"
          placeholder="Search products..."
          class="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-brake focus:outline-none"
        />
      </div>

      <!-- Desktop Links -->
      <div class="hidden items-center gap-6 md:flex">
        <RouterLink to="/categories" class="text-sm text-zinc-300 hover:text-white">Categories</RouterLink>
        <RouterLink to="/products" class="text-sm text-zinc-300 hover:text-white">Products</RouterLink>

        <RouterLink to="/cart" class="relative text-m text-zinc-300 hover:text-white">
          🛒
          <span
            v-if="cart.count"
            class="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brake text-[10px] font-bold text-white"
          >
            {{ cart.count }}
          </span>
        </RouterLink>

        <!-- <RouterLink class="btn-primary py-2" to="/products">
          Shop Now
        </RouterLink> -->
      </div>

      <!-- Mobile Hamburger -->
      <button
        class="flex flex-col gap-1 md:hidden"
        @click="open = !open"
      >
        <span class="h-0.5 w-6 bg-white"></span>
        <span class="h-0.5 w-6 bg-white"></span>
        <span class="h-0.5 w-6 bg-white"></span>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="open"
      class="border-t border-zinc-800 bg-ink p-4 md:hidden"
    >
      <input
        v-model="search"
        @keyup.enter="goToSearch"
        type="text"
        placeholder="Search products..."
        class="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white"
      />

      <div class="flex flex-col gap-4">
        <RouterLink @click="open = false" to="/categories">Categories</RouterLink>
        <RouterLink @click="open = false" to="/products">Products</RouterLink>
        <RouterLink @click="open = false" to="/cart">
          Cart ({{ cart.count }})
        </RouterLink>
        <!-- <RouterLink @click="open = false" class="btn-primary text-center py-2" to="/products">
          Shop Now
        </RouterLink> -->
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

function goToSearch() {
  router.push({
    path: '/products',
    query: { search: search.value }
  })

  open.value = false
}
</script>
