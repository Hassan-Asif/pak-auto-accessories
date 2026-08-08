<template>
  <main class="min-h-screen bg-zinc-50 py-6 sm:py-10 lg:py-16">

    <div class="container-page">

      <!-- Header -->

     <div class="mb-8 lg:mb-12">

        <span class="inline-flex rounded-full bg-black px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white">
          Checkout
        </span>

        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-zinc-900">
          Complete Your Order
        </h1>

        <p class="mt-3 text-base sm:text-lg text-zinc-600">
          Fill in your delivery details and we'll confirm your order before payment.
        </p>

      </div>

      <form
        class="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_380px]"
        @submit.prevent="placeOrder"
      >

        <!-- LEFT -->

        <section
          class="rounded-2xl lg:rounded-3xl border border-zinc-300 bg-white p-4 sm:p-6 lg:p-8 shadow-sm text-black"
        >

          <h2 class="mb-6 text-xl sm:text-2xl font-bold">
            Customer Information
          </h2>

          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2">

            <div>
              <label class="mb-2 block text-sm font-medium text-zinc-700">
                Full Name
              </label>

              <input
                v-model="form.customer.name"
                required
                class="field w-full bg-white text-black"
              >
            </div>

            <div>
              <label class="label bg-white">
                WhatsApp Number
              </label>

              <input
                v-model="form.customer.phone"
                required
                class="field bg-white text-black"
              >
            </div>

            <div>
              <label class="label bg-white">
                City
              </label>

              <input
                v-model="form.customer.city"
                required
                class="field bg-white text-black"
              >
            </div>

            <div>
              <label class="label bg-white">
                Email
              </label>

              <input
                v-model="form.customer.email"
                type="email"
                class="field bg-white text-black"
              >
            </div>

          </div>

          <div class="mt-6">

            <label class="label bg-white">
              Delivery Address
            </label>

            <textarea
              v-model="form.customer.address"
              required
              class="field w-full min-h-32 sm:min-h-36 bg-white text-black"
            />

          </div>

          <div class="mt-6">

            <label class="label">
              Payment Method
            </label>

            <select
              v-model="form.paymentMethod"
              class="field bg-white text-black"
            >
              <option
                v-for="method in paymentMethods"
                :key="method"
              >
                {{ method }}
              </option>
            </select>

          </div>

          <div class="mt-6">

            <label class="label">
              Order Notes
            </label>

            <textarea
              v-model="form.notes"
              class="field w-full min-h-24 sm:min-h-28 bg-white text-black"
              placeholder="Vehicle model, year, trim or special instructions."
            />

          </div>

        </section>

        <!-- RIGHT -->

        <aside
  class="min-w-0 h-fit rounded-2xl border border-zinc-300 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:sticky lg:top-24 lg:p-8"
>

  <!-- Header -->

  <h2 class="text-xl font-bold text-black sm:text-2xl">
    Order Summary
  </h2>


  <!-- Items -->

  <div class="mt-6 space-y-4">

    <div
      v-for="item in cart.items"
      :key="item.id"
      class="flex min-w-0 items-start gap-3 border-b border-zinc-100 pb-4 text-black"
    >

      <!-- Product Info -->

      <div class="min-w-0 flex-1">

        <p
          class="break-words text-sm font-bold leading-5 text-zinc-900 sm:text-base"
        >
          {{ item.name }}
        </p>

        <p class="mt-1 text-xs text-zinc-500 sm:text-sm">
          Qty {{ item.quantity }}
        </p>

      </div>


      <!-- Item Price -->

      <p
        class="shrink-0 text-right text-sm font-bold text-zinc-900 sm:text-base"
      >
        Rs {{ (item.price * item.quantity).toLocaleString() }}
      </p>

    </div>

  </div>


  <!-- Totals -->

  <div
    class="mt-6 space-y-4 border-t border-zinc-300 pt-5"
  >

    <!-- Subtotal -->

    <div
      class="flex items-center justify-between gap-4 text-sm sm:text-base"
    >

      <span class="text-zinc-500">
        Subtotal
      </span>

      <span class="shrink-0 font-medium text-black">
        Rs {{ cart.subtotal.toLocaleString() }}
      </span>

    </div>


    <!-- Total -->

    <div
      class="flex items-center justify-between gap-4 border-t border-zinc-200 pt-4"
    >

      <span class="text-lg font-black text-black sm:text-xl">
        Total
      </span>

      <span
        class="shrink-0 text-lg font-black text-black sm:text-xl"
      >
        Rs {{ cart.subtotal.toLocaleString() }}
      </span>

    </div>

  </div>


  <!-- Checkout Button -->

  <button
    class="mt-6 w-full rounded-xl bg-black py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.99] sm:mt-8 sm:py-4 sm:text-base"
    :disabled="saving || !cart.items.length"
  >
    {{ saving ? 'Placing Order...' : 'Place Order' }}
  </button>


  <!-- Trust -->

  <div
    class="mt-5 rounded-2xl bg-zinc-50 p-4 text-xs leading-6 text-zinc-600 sm:mt-6 sm:p-5 sm:text-sm"
  >

    <p>
      ✓ Order confirmation before payment
    </p>

    <p class="mt-1">
      ✓ Secure checkout
    </p>

    <p class="mt-1">
      ✓ Nationwide delivery
    </p>

  </div>

</aside>

      </form>

    </div>

  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { paymentMethods } from '../data/constants'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/orders'

const router = useRouter()
const cart = useCartStore()
const orders = useOrderStore()
const saving = ref(false)
const form = reactive({ customer: { name: '', phone: '', city: '', email: '', address: '' }, paymentMethod: 'COD', notes: '' })

async function placeOrder() {
  saving.value = true
  const orderId = await orders.createOrder({
    ...form,
    items: cart.items,
    totals: { subtotal: cart.subtotal, delivery: 0, total: cart.subtotal }
  })
  cart.clear()
  router.push(`/order-confirmation/${orderId}`)
}
</script>
