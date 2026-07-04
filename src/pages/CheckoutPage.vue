<template>
  <main class="container-page py-12">
    <h1 class="text-4xl font-black">Checkout</h1>
    <p class="mt-3 text-red-100">Do not send payment until our team confirms vendor availability on WhatsApp.</p>
    <form class="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]" @submit.prevent="placeOrder">
      <section class="grid gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label class="label">Full name</label><input v-model="form.customer.name" required class="field" /></div>
          <div><label class="label">WhatsApp number</label><input v-model="form.customer.phone" required class="field" placeholder="03xx..." /></div>
          <div><label class="label">City</label><input v-model="form.customer.city" required class="field" /></div>
          <div><label class="label">Email</label><input v-model="form.customer.email" type="email" class="field" /></div>
        </div>
        <div><label class="label">Delivery address</label><textarea v-model="form.customer.address" required class="field min-h-28"></textarea></div>
        <div>
          <label class="label">Payment method after confirmation</label>
          <select v-model="form.paymentMethod" class="field">
            <option v-for="method in paymentMethods" :key="method">{{ method }}</option>
          </select>
        </div>
        <div><label class="label">Notes</label><textarea v-model="form.notes" class="field min-h-24" placeholder="Car model, year, trim, or fitment notes"></textarea></div>
      </section>
      <aside class="h-fit rounded-lg border border-zinc-800 bg-zinc-950 p-5">
        <h2 class="text-xl font-black">Order Summary</h2>
        <div class="mt-4 space-y-3">
          <div v-for="item in cart.items" :key="item.id" class="flex justify-between gap-3 text-sm">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>Rs {{ (item.price * item.quantity).toLocaleString() }}</span>
          </div>
        </div>
        <div class="mt-5 flex justify-between border-t border-zinc-800 pt-5 font-black">
          <span>Total</span><span>Rs {{ cart.subtotal.toLocaleString() }}</span>
        </div>
        <button class="btn-primary mt-6 w-full" :disabled="saving || !cart.items.length">{{ saving ? 'Placing...' : 'Place Order' }}</button>
      </aside>
    </form>
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
