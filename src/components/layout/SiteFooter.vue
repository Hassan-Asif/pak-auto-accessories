<template>
  <footer class="border-t border-zinc-800 bg-zinc-950">
    <div class="container-page grid gap-8 py-12 md:grid-cols-4">
      <div>
        <p class="text-lg font-black">Neon<span class="text-brake">LEDs</span></p>
        <p class="mt-3 text-sm text-zinc-400">Vendor-confirmed car accessories for Pakistan. No payment before availability confirmation.</p>
      </div>
      <div>
        <h3 class="font-bold">Shop</h3>
        <RouterLink class="mt-3 block text-sm text-zinc-400" to="/products">Products</RouterLink>
        <RouterLink class="mt-2 block text-sm text-zinc-400" to="/categories">Categories</RouterLink>
      </div>
      <div>
        <h3 class="font-bold">Support</h3>
        <a class="mt-3 block text-sm text-zinc-400" :href="supportMessage('I want to confirm a product before payment')" target="_blank" rel="noopener">WhatsApp Confirmation</a>
        <p class="mt-2 text-sm text-zinc-400">COD, Easypaisa, JazzCash, Bank Transfer after confirmation.</p>
      </div>
      <div>
        <h3 class="font-bold">Delivery</h3>
        <p class="mt-3 text-sm text-zinc-400">Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad and nationwide courier support.</p>
      </div>
    </div>

     <div class="relative border-t border-cyan-800/30 mt-12 pt-6 text-center text-gray-500 text-sm z-10">
      © {{ new Date().getFullYear() }}
      <a
        href="https://aqil-lab.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white hover:text-red-400 transition font-semibold"
      >
        AqilLabs
      </a>
      — All Rights Reserved.
    </div>
    &nbsp;
  </footer>
</template>

<script setup>
import { supportMessage } from '../../utils/whatsapp'
</script>
