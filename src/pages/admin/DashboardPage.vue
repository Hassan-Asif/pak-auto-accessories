<template>
  <AdminShell>
    <section class="p-6">
      <h1 class="text-3xl font-black">Dashboard</h1>
      <div class="mt-6 grid gap-4 md:grid-cols-4">
        <div class="rounded-lg border border-zinc-800 bg-ink p-5"><p class="text-sm text-zinc-400">Products</p><p class="mt-2 text-3xl font-black">{{ products.products.length }}</p></div>
        <div class="rounded-lg border border-zinc-800 bg-ink p-5"><p class="text-sm text-zinc-400">Orders</p><p class="mt-2 text-3xl font-black">{{ orders.orders.length }}</p></div>
        <div class="rounded-lg border border-zinc-800 bg-ink p-5"><p class="text-sm text-zinc-400">Pending</p><p class="mt-2 text-3xl font-black">{{ pending }}</p></div>
        <div class="rounded-lg border border-zinc-800 bg-ink p-5"><p class="text-sm text-zinc-400">Profit Potential</p><p class="mt-2 text-3xl font-black">Rs {{ profit.toLocaleString() }}</p></div>
      </div>
      <div class="mt-8 rounded-lg border border-zinc-800 bg-ink p-5">
        <h2 class="text-xl font-black">Operating model</h2>
        <p class="mt-3 text-sm text-zinc-400">Orders should move from Pending Confirmation to Vendor Checking before any customer payment request. Confirm vendor availability first, then contact the customer on WhatsApp.</p>
      </div>
    </section>
  </AdminShell>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import AdminShell from './AdminShell.vue'
import { useOrderStore } from '../../stores/orders'
import { useProductStore } from '../../stores/products'

const products = useProductStore()
const orders = useOrderStore()
const pending = computed(() => orders.orders.filter((order) => ['Pending Confirmation', 'Vendor Checking'].includes(order.status)).length)
const profit = computed(() => products.products.reduce((sum, product) => sum + Number(product.profit || 0), 0))

onMounted(() => {
  products.fetchAdminProducts()
  orders.fetchOrders()
})
</script>
