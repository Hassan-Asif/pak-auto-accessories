<template>
  <main class="container-page py-16">
    <div class="mx-auto max-w-2xl rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
      <p class="text-sm font-bold uppercase text-brake">Order received</p>
      <h1 class="mt-3 text-4xl font-black">Pending vendor confirmation</h1>
      <p class="mt-4 text-zinc-400">Order ID: {{ $route.params.id }}</p>
      <p class="mt-4 text-zinc-300">We will check vendor availability and contact you on WhatsApp. Payment will only be requested after confirmation.</p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a :href="supportMessage(`I placed order ${$route.params.id}. Please confirm availability.`)" class="btn-primary" target="_blank" rel="noopener">Message on WhatsApp</a>
        <RouterLink to="/products" class="btn-secondary">Continue Shopping</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { supportMessage } from '../utils/whatsapp'
</script>
