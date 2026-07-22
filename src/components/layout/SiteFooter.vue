<template>
  <footer class="bg-black text-white">

    <div class="container-page grid gap-8 py-10 md:grid-cols-4">

      <!-- Brand -->
      <div>

        <h2 class="text-xl font-black">
          Neon<span class="text-zinc-400">LEDs</span>
        </h2>

        <p class="mt-3 text-sm leading-6 text-zinc-400">
          Premium automotive accessories for every enthusiast.
          From LED lighting and styling upgrades to interior,
          exterior and detailing products.
        </p>

      </div>

      <!-- Shop -->
      <div>

        <h3 class="mb-3 text-base font-bold">
          Shop
        </h3>

        <div class="space-y-2">

          <RouterLink
            to="/products"
            class="block text-zinc-400 transition hover:text-white"
          >
            Products
          </RouterLink>

          <RouterLink
            to="/categories"
            class="block text-zinc-400 transition hover:text-white"
          >
            Categories
          </RouterLink>

        </div>

      </div>

      <!-- Support -->
      <div>

        <h3 class="mb-5 text-lg font-bold">
          Support
        </h3>

        <div class="space-y-2">

          <a
            :href="supportMessage('I need help choosing car accessories')"
            target="_blank"
            rel="noopener"
            class="block text-zinc-400 transition hover:text-white"
          >
            WhatsApp Support
          </a>

          <RouterLink
  to="/contact"
  class="block text-zinc-400 transition hover:text-white"
>
  Contact Us
</RouterLink>

          <!-- <p class="text-zinc-400">
            Cash on Delivery
          </p>

          <p class="text-zinc-400">
            Easypaisa
          </p>

          <p class="text-zinc-400">
            JazzCash
          </p>

          <p class="text-zinc-400">
            Bank Transfer
          </p> -->

        </div>

      </div>

      <!-- Company -->
      <div>

        <h3 class="mb-5 text-lg font-bold">
          Company
        </h3>

        <div class="space-y-2">

          <p class="text-zinc-400">
            Karachi, Pakistan
          </p>

          <!-- <p class="text-zinc-400">
            Nationwide Delivery
          </p> -->

          <p class="text-zinc-400">
            Secure Shopping
          </p>

          <p class="text-zinc-400">
            Verified Products
          </p>

        </div>

      </div>

    </div>


      <div class="mt-8 border-t border-zinc-800 pt-4 text-center text-xs text-zinc-500">
      © {{ new Date().getFullYear() }}
      <a class="text-white">NeonLEDs. </a>
        All Rights Reserved. Design And Developed By
      <a
        href="https://aqil-lab.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white hover:text-white transition font-semibold"
      >
        AqilLabs
      </a>
      </div>
      &nbsp;

  </footer>
</template>

<script setup>
import { supportMessage } from '../../utils/whatsapp'
</script>