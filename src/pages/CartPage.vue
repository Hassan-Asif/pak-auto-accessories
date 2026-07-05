<template>
  <main class="container-page py-12">
    <h1 class="text-4xl font-black">Cart</h1>
    <div v-if="!cart.items.length" class="mt-8 rounded-lg border border-zinc-800 p-8 text-zinc-400">
      Your cart is empty. <RouterLink to="/products" class="text-red-200">Browse products</RouterLink>.
    </div>
    <div v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div class="space-y-4">
        <div v-for="item in cart.items" :key="item.id" class="grid gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:grid-cols-[96px_1fr_auto]">
          <img :src="item.image" :alt="item.name" class="h-24 w-24 rounded-md object-cover" />
          <div>
            <h2 class="font-bold">{{ item.name }}</h2>
            <!-- <p class="mt-1 text-sm text-zinc-400">{{ item.availabilityStatus }}</p> -->
            <button class="mt-3 text-sm text-red-200" @click="cart.remove(item.id)">Remove</button>
          </div>
          <div class="flex items-center gap-3">
            <input class="field w-20" type="number" min="1" :value="item.quantity" @input="cart.updateQuantity(item.id, $event.target.value)" />
            <p class="w-28 text-right font-black">Rs {{ (item.price * item.quantity).toLocaleString() }}</p>
          </div>
        </div>
      </div>
      <aside class="h-fit rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        <div class="flex justify-between text-lg font-black"><span>Subtotal</span><span>Rs {{ cart.subtotal.toLocaleString() }}</span></div>
        <p class="mt-4 text-sm text-zinc-400">Delivery and payment are confirmed after vendor availability check.</p>
        <RouterLink to="/checkout" class="btn-primary mt-6 w-full">Checkout</RouterLink>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>
