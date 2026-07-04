<template>
  <AdminShell>
    <section class="p-6">
      <h1 class="text-3xl font-black">Orders</h1>
      <div class="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
        <table class="w-full min-w-[1000px] text-left text-sm">
          <thead class="bg-zinc-900 text-zinc-400"><tr><th class="p-3">Customer</th><th class="p-3">Items</th><th class="p-3">Payment</th><th class="p-3">Total</th><th class="p-3">Status</th><th class="p-3">Action</th></tr></thead>
          <tbody>
            <tr v-for="order in orders.orders" :key="order.id" class="border-t border-zinc-800 align-top">
              <td class="p-3">{{ order.customer?.name }}<span class="block text-xs text-zinc-500">{{ order.customer?.phone }} · {{ order.customer?.city }}</span><span class="block text-xs text-zinc-500">{{ order.customer?.address }}</span></td>
              <td class="p-3"><span v-for="item in order.items" :key="item.id" class="block">{{ item.name }} x {{ item.quantity }}</span></td>
              <td class="p-3">{{ order.paymentMethod }}<span class="block text-xs text-red-200">Request only after confirmation</span></td>
              <td class="p-3">Rs {{ Number(order.totals?.total || 0).toLocaleString() }}</td>
              <td class="p-3"><select class="field" :value="order.status" @change="orders.updateStatus(order.id, $event.target.value)"><option v-for="status in orderStatuses" :key="status">{{ status }}</option></select></td>
              <td class="p-3"><a class="text-green-300" :href="supportMessage(`Order ${order.id}: we are checking vendor availability for your items.`)" target="_blank" rel="noopener">WhatsApp</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </AdminShell>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminShell from './AdminShell.vue'
import { orderStatuses } from '../../data/constants'
import { useOrderStore } from '../../stores/orders'
import { supportMessage } from '../../utils/whatsapp'

const orders = useOrderStore()
onMounted(() => orders.fetchOrders())
</script>
