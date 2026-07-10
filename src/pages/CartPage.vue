<template>
  <main class="min-h-screen bg-zinc-50 py-16">

    <div class="container-page">

      <!-- Header -->

      <div class="mb-12">

        <span class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
          Shopping Cart
        </span>

        <h1 class="mt-5 text-5xl font-black text-zinc-900">
          Your Cart
        </h1>

        <p class="mt-3 text-lg text-zinc-600">
          Review your selected products before checkout.
        </p>

      </div>

      <!-- Empty Cart -->

      <div
        v-if="!cart.items.length"
        class="rounded-3xl border border-zinc-200 bg-white p-20 text-center shadow-sm"
      >

        <div class="text-6xl">
          🛒
        </div>

        <h2 class="mt-6 text-3xl font-black text-zinc-900">
          Your cart is empty
        </h2>

        <p class="mt-4 text-zinc-500">
          Browse our premium collection of accessories.
        </p>

        <RouterLink
          to="/products"
          class="mt-8 inline-flex rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
        >
          Browse Products
        </RouterLink>

      </div>

      <!-- Cart -->

      <div
        v-else
        class="grid gap-8 lg:grid-cols-[1fr_340px]"
      >

        <!-- Products -->

        <div class="space-y-6">

          <div
  v-for="item in cart.items"
  :key="item.id"
  class="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md"
>

  <!-- Image -->
  <img
    :src="item.image"
    :alt="item.name"
    class="h-24 w-24 rounded-xl object-cover"
  >

  <!-- Content -->
  <div class="flex flex-1 flex-col justify-between">

    <div>

      <p class="text-xs uppercase tracking-wide text-zinc-500">
        {{ item.category }}
      </p>

      <h2 class="mt-1 text-lg font-bold text-zinc-900">
        {{ item.name }}
      </h2>

      <p class="mt-3 text-2xl font-black text-black">
        Rs {{ Number(item.price).toLocaleString() }}
      </p>

    </div>

    <div class="mt-4 flex items-center justify-between">

      <!-- Quantity -->

      <div class="flex items-center overflow-hidden rounded-xl border border-zinc-300">

        <button
          class="px-4 py-2 hover:bg-zinc-100 text-black"
          @click="cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))"
        >
          −
        </button>

        <span class="w-10 text-center font-semibold text-black">
          {{ item.quantity }}
        </span>

        <button
          class="px-4 py-2 hover:bg-zinc-100 text-black"
          @click="cart.updateQuantity(item.id, item.quantity + 1)"
        >
          +
        </button>

      </div>

      <button
        class="text-sm font-medium text-red-500 transition hover:text-red-700"
        @click="cart.remove(item.id)"
      >
        Remove
      </button>

    </div>

  </div>

</div>
</div>

        <!-- Summary -->

        <aside
          class="sticky top-20 h-fit rounded-2xl border border-zinc-300 bg-white p-8 shadow-sm"
        >

          <h2 class="text-2xl font-bold text-black">
            Order Summary
          </h2>

          <div class="mt-8 space-y-5">

            <div class="flex justify-between">

              <span class="text-zinc-500">
                Items
              </span>

              <span class="text-black">
                {{ cart.count }}
              </span>

            </div>

            <div class="flex justify-between">

              <span class="text-zinc-500">
                Subtotal
              </span>

              <span class="text-black">
                Rs {{ cart.subtotal.toLocaleString() }}
              </span>

            </div>

            <div class="flex justify-between">

              <!-- <span class="text-zinc-500">
                Delivery
              </span> -->

              <!-- <span>
                Calculated later
              </span> -->

            </div>

            <div class="border-t border-zinc-200 pt-5">

              <div class="flex justify-between text-2xl font-black text-black">

                <span>Total</span>

                <span class="text-black">
                  Rs {{ cart.subtotal.toLocaleString() }}
                </span>

              </div>

            </div>

          </div>

          <RouterLink
            to="/checkout"
            class="mt-8 flex w-full items-center justify-center rounded-xl bg-black py-3 text-base font-semibold transition hover:bg-zinc-800 text-white transition hover:bg-zinc-800"
          >
            Proceed to Checkout
          </RouterLink>

          <div class="mt-6 flex flex-wrap gap-2">

  <span class="rounded-full bg-zinc-200 px-3 py-2 text-xs text-black">
    ✓ Secure Checkout
  </span>

  <span class="rounded-full bg-zinc-200 px-3 py-2 text-xs text-black">
    ✓ Verified Products
  </span>

  <span class="rounded-full bg-zinc-200 px-3 py-2 text-xs text-black">
    ✓ Nationwide Delivery
  </span>

</div>

        </aside>

      </div>

    </div>

  </main>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>
