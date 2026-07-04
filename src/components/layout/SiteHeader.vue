<template>
  <header class="sticky top-0 z-40 border-b border-zinc-800 bg-ink/90 backdrop-blur">
    <nav class="container-page flex h-16 items-center justify-between">
      <RouterLink to="/" class="text-lg font-black tracking-wide">Neon<span class="text-brake">LEDs</span></RouterLink>
      <button class="rounded-md border border-zinc-700 px-3 py-2 text-sm md:hidden" @click="open = !open">Menu</button>
      <div :class="open ? 'flex' : 'hidden'" class="absolute left-0 right-0 top-16 flex-col gap-4 border-b border-zinc-800 bg-ink p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0">
        <RouterLink class="text-sm text-zinc-300 hover:text-white" to="/categories">Categories</RouterLink>
        <RouterLink class="text-sm text-zinc-300 hover:text-white" to="/products">Products</RouterLink>
        <RouterLink class="text-sm text-zinc-300 hover:text-white" to="/cart">Cart ({{ cart.count }})</RouterLink>
        <RouterLink class="btn-primary py-2" to="/products">Shop Now</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'

const open = ref(false)
const cart = useCartStore()
</script>
