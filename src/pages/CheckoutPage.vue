<template>
  <main class="min-h-screen bg-zinc-50 py-16">

    <div class="container-page">

      <!-- Header -->

      <div class="mb-12">

        <span class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
          Checkout
        </span>

        <h1 class="mt-5 text-5xl font-black text-zinc-900">
          Complete Your Order
        </h1>

        <p class="mt-3 text-lg text-zinc-600">
          Fill in your delivery details and we'll confirm your order before payment.
        </p>

      </div>

      <form
        class="grid gap-10 lg:grid-cols-[1fr_380px]"
        @submit.prevent="placeOrder"
      >

        <!-- LEFT -->

        <section
          class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
        >

          <h2 class="mb-8 text-2xl font-bold">
            Customer Information
          </h2>

          <div class="grid gap-6 sm:grid-cols-2">

            <div>
              <label class="label">
                Full Name
              </label>

              <input
                v-model="form.customer.name"
                required
                class="field bg-white"
              >
            </div>

            <div>
              <label class="label bg-white">
                WhatsApp Number
              </label>

              <input
                v-model="form.customer.phone"
                required
                class="field bg-white"
              >
            </div>

            <div>
              <label class="label bg-white">
                City
              </label>

              <input
                v-model="form.customer.city"
                required
                class="field bg-white"
              >
            </div>

            <div>
              <label class="label bg-white">
                Email
              </label>

              <input
                v-model="form.customer.email"
                type="email"
                class="field bg-white"
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
              class="field min-h-36 bg-white"
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
              class="field min-h-28 bg-white"
              placeholder="Vehicle model, year, trim or special instructions."
            />

          </div>

        </section>

        <!-- RIGHT -->

        <aside
          class="sticky top-24 h-fit rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
        >

          <h2 class="text-2xl font-bold text-black">
            Order Summary
          </h2>

          <div class="mt-8 space-y-5">

            <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex items-center justify-between border-b border-zinc-100 pb-4 text-black"
            >

              <div>

                <p class="font-semibold text-zinc-900 ">
                  {{ item.name }}
                </p>

                <p class="text-sm text-zinc-500">
                  Qty {{ item.quantity }}
                </p>

              </div>

              <p class="font-bold">
                Rs {{ (item.price * item.quantity).toLocaleString() }}
              </p>

            </div>

          </div>

          <div class="mt-8 space-y-4 border-t border-zinc-200 pt-6">

            <div class="flex justify-between">

              <span class=" text-black">
                Subtotal
              </span>

              <span class="text-black">
                Rs {{ cart.subtotal.toLocaleString() }}
              </span>

            </div>

            <div class="flex justify-between text-black">

              <!-- <span class="text-zinc-500">
                Delivery
              </span>

              <span>
                Calculated after confirmation
              </span> -->

            </div>

            <div class="flex justify-between text-xl font-black text-black">

              <span>Total</span>

              <span>
                Rs {{ cart.subtotal.toLocaleString() }}
              </span>

            </div>

          </div>

          <button
            class="mt-8 w-full rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-zinc-800"
            :disabled="saving || !cart.items.length"
          >
            {{ saving ? 'Placing Order...' : 'Place Order' }}
          </button>

          <div
            class="mt-8 rounded-2xl bg-zinc-100 p-5 text-sm text-zinc-600"
          >

            ✔ Order confirmation before payment

            <br><br>

            ✔ Secure checkout

            <br><br>

            ✔ Nationwide delivery

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
