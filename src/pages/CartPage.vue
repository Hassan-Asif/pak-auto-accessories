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
        class="grid gap-10 lg:grid-cols-[1fr_380px]"
      >

        <!-- Products -->

        <div class="space-y-6">

          <div
            v-for="item in cart.items"
            :key="item.id"
            class="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[120px_1fr_auto]"
          >

            <img
              :src="item.image"
              :alt="item.name"
              class="h-28 w-28 rounded-2xl object-cover"
            >

            <div>

              <h2 class="text-xl font-bold text-zinc-900">
                {{ item.name }}
              </h2>

              <p class="mt-2 text-sm text-zinc-500">
                {{ item.category }}
              </p>

              <!-- <div
                v-if="item.compatibleVehicles?.length"
                class="mt-4 inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
              >
                🚗 {{ item.compatibleVehicles[0].displayName }}
              </div> -->

              <button
                class="mt-5 text-sm font-semibold text-red-600 hover:text-red-700"
                @click="cart.remove(item.id)"
              >
                Remove
              </button>

            </div>

            <div class="flex flex-col items-end justify-between">

              <p class="text-2xl font-black text-zinc-900">
                Rs {{ (item.price * item.quantity).toLocaleString() }}
              </p>

              <input
                class="field mt-4 w-24 text-black bg-white"
                type="number"
                min="1"
                :value="item.quantity"
                @input="cart.updateQuantity(item.id, Number($event.target.value))"
              >

            </div>

          </div>

        </div>

        <!-- Summary -->

        <aside
          class="sticky top-24 h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
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
            class="mt-8 flex w-full items-center justify-center rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-zinc-800"
          >
            Proceed to Checkout
          </RouterLink>

          <div
            class="mt-8 rounded-2xl bg-zinc-100 p-5 text-sm text-zinc-600"
          >
            ✔ Confirm availability before payment

            <br><br>

            ✔ Secure checkout

            <br><br>

            ✔ Nationwide delivery
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
