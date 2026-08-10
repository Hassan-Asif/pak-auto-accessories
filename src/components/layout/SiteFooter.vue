<template>
  <footer class="bg-black text-white">

  <!-- Main Footer -->
  <div class="container-page py-12 sm:py-16 lg:py-20">

    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">

      <!-- Brand -->
      <div class="sm:col-span-2 lg:col-span-1">

        <RouterLink
          to="/"
          class="inline-block text-2xl font-black tracking-tight"
        >
          Neon<span class="text-zinc-500">LEDs</span>
        </RouterLink>

        <p
          class="mt-4 max-w-sm text-sm leading-7 text-zinc-400"
        >
          Premium automotive accessories for drivers who want
          better style, better lighting and a better driving experience.
        </p>


        <!-- Location -->
        <div class="mt-6 flex items-center gap-2 text-sm text-zinc-400">
          <span>📍</span>
          <span>Karachi, Pakistan</span>
        </div>


        <!-- WhatsApp -->
        <a
          :href="supportMessage('I need help choosing car accessories')"
          target="_blank"
          rel="noopener"
          class="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
        >
          <span>💬</span>
          WhatsApp Support
        </a>

      </div>


      <!-- Shop -->
      <div>

        <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
          Shop
        </h3>

        <div class="space-y-3">

          <RouterLink
            to="/products"
            class="block text-sm text-zinc-400 transition hover:text-white"
          >
            All Products
          </RouterLink>

          <RouterLink
            to="/categories"
            class="block text-sm text-zinc-400 transition hover:text-white"
          >
            Categories
          </RouterLink>

          <RouterLink
            to="/cart"
            class="block text-sm text-zinc-400 transition hover:text-white"
          >
            Shopping Cart
          </RouterLink>

        </div>

      </div>


      <!-- Support -->
      <div>

        <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
          Support
        </h3>

        <div class="space-y-3">

          <a
            :href="supportMessage('I need help choosing car accessories')"
            target="_blank"
            rel="noopener"
            class="block text-sm text-zinc-400 transition hover:text-white"
          >
            WhatsApp Support
          </a>

          

          <RouterLink
            to="/checkout"
            class="block text-sm text-zinc-400 transition hover:text-white"
          >
            Checkout
          </RouterLink>

        </div>

      </div>


      <!-- Why NeonLEDs -->
      <div>

        <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-white">
          Why NeonLEDs
        </h3>

        <div class="space-y-3">

          <p class="text-sm text-zinc-400">
            ✓ Verified Products
          </p>

          <p class="text-sm text-zinc-400">
            ✓ Vehicle Compatibility
          </p>

          <p class="text-sm text-zinc-400">
            ✓ Nationwide Delivery
          </p>

          <p class="text-sm text-zinc-400">
            ✓ Order Confirmation
          </p>

        </div>

      </div>

    </div>


    <!-- Divider -->
    <div class="mt-12 border-t border-zinc-800 pt-8 sm:mt-16">

      <div
        class="flex flex-col gap-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
      >

        <p>
          © {{ new Date().getFullYear() }}
          <span class="font-semibold text-zinc-300">
            NeonLEDs
          </span>.
          All Rights Reserved.
        </p>


        <p>
          Designed & Developed by
          <a
            href="https://aqil-lab.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-zinc-300 transition hover:text-white"
          >
            AqilLabs
          </a>
        </p>

      </div>

    </div>

  </div>

</footer>
</template>

<script setup>
import { supportMessage } from '../../utils/whatsapp'
</script>