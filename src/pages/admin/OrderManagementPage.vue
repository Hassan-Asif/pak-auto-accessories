```vue
<template>
  <AdminShell>

    <section class="space-y-8">

      <!-- ================= HEADER ================= -->

      <div>
        <p
          class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600"
        >
          Store Management
        </p>

        <h1 class="mt-2 text-3xl font-black text-white sm:text-4xl">
          Orders
        </h1>

        <p class="mt-2 text-sm text-zinc-500">
          Review customer orders, confirm vendor availability and update
          order status.
        </p>
      </div>


      <!-- ================= ORDER COUNT ================= -->

      <div
        class="flex flex-wrap gap-3"
      >

        <div
          class="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
        >
          <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
            Total Orders
          </p>

          <p class="mt-1 text-xl font-black text-white">
            {{ orders.orders.length }}
          </p>
        </div>


        <div
          class="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
        >
          <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
            Pending
          </p>

          <p class="mt-1 text-xl font-black text-amber-400">
            {{ pendingCount }}
          </p>
        </div>


        <div
          class="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
        >
          <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
            Confirmed
          </p>

          <p class="mt-1 text-xl font-black text-emerald-400">
            {{ confirmedCount }}
          </p>
        </div>

      </div>


      <!-- ================= EMPTY ================= -->

      <div
        v-if="!orders.orders.length"
        class="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900 p-12 text-center"
      >

        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-2xl"
        >
          🛒
        </div>

        <h2 class="mt-5 text-xl font-bold text-white">
          No orders yet
        </h2>

        <p class="mt-2 text-sm text-zinc-600">
          Customer orders will appear here.
        </p>

      </div>


      <!-- ================= DESKTOP TABLE ================= -->

      <div
        v-else
        class="hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 md:block"
      >

        <div class="overflow-x-auto">

          <table class="w-full min-w-[1000px] text-left">

            <thead
              class="border-b border-zinc-800 bg-zinc-950"
            >

              <tr>

                <th class="p-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Customer
                </th>

                <th class="p-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Items
                </th>

                <th class="p-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Total
                </th>

                <th class="p-4 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Status
                </th>

                <th class="p-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              <tr
                v-for="order in orders.orders"
                :key="order.id"
                class="border-t border-zinc-800 transition hover:bg-zinc-950"
              >

                <!-- Customer -->

                <td class="max-w-[250px] p-4">

                  <p class="truncate font-bold text-white">
                    {{ order.customer?.name || 'Unknown Customer' }}
                  </p>

                  <p class="mt-1 text-xs text-zinc-600">
                    {{ order.customer?.phone || 'No phone' }}
                  </p>

                  <p class="text-xs text-zinc-600">
                    {{ order.customer?.city || 'No city' }}
                  </p>

                </td>


                <!-- Items -->

                <td class="p-4">

                  <p class="text-sm font-semibold text-zinc-300">
                    {{ order.items?.length || 0 }}
                    {{ order.items?.length === 1 ? 'item' : 'items' }}
                  </p>

                  <p
                    class="mt-1 max-w-[240px] truncate text-xs text-zinc-600"
                  >
                    {{ itemPreview(order) }}
                  </p>

                </td>


                <!-- Total -->

                <td class="p-4 whitespace-nowrap">

                  <p class="font-black text-white">
                    Rs {{ Number(order.totals?.total || 0).toLocaleString() }}
                  </p>

                  <p class="mt-1 text-xs text-zinc-600">
                    {{ order.paymentMethod || 'Payment not selected' }}
                  </p>

                </td>


                <!-- Status -->

                <td class="p-4">

                  <select
                    :value="order.status"
                    class="w-full max-w-[190px] rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-300 outline-none focus:border-white"
                    @change="changeStatus(order, $event.target.value)"
                  >

                    <option
                      v-for="status in orderStatuses"
                      :key="status"
                      :value="status"
                    >
                      {{ status }}
                    </option>

                  </select>

                </td>


                <!-- Actions -->

                <td class="p-4 text-right">

                  <button
                    type="button"
                    class="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-zinc-200"
                    @click="openOrder(order)"
                  >
                    View Details
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>


      <!-- ================= MOBILE ORDERS ================= -->

      <div
        v-if="orders.orders.length"
        class="grid gap-3 md:hidden"
      >

        <div
          v-for="order in orders.orders"
          :key="order.id"
          class="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
        >

          <div class="flex items-start justify-between gap-3">

            <div class="min-w-0">

              <p class="truncate font-bold text-white">
                {{ order.customer?.name || 'Unknown Customer' }}
              </p>

              <p class="mt-1 text-xs text-zinc-600">
                {{ order.customer?.phone || 'No phone' }}
              </p>

              <p class="text-xs text-zinc-600">
                {{ order.customer?.city || 'No city' }}
              </p>

            </div>


            <p class="shrink-0 text-lg font-black text-white">
              Rs {{ Number(order.totals?.total || 0).toLocaleString() }}
            </p>

          </div>


          <div
            class="mt-4 rounded-xl bg-zinc-950 p-3"
          >

            <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-700">
              Items
            </p>

            <p class="mt-1 text-sm text-zinc-400">
              {{ itemPreview(order) }}
            </p>

          </div>


          <div class="mt-3">

            <label
              class="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-700"
            >
              Order Status
            </label>

            <select
              :value="order.status"
              class="field"
              @change="changeStatus(order, $event.target.value)"
            >

              <option
                v-for="status in orderStatuses"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>

            </select>

          </div>


          <div class="mt-3 grid grid-cols-2 gap-2">

            <button
              type="button"
              class="rounded-xl bg-white py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
              @click="openOrder(order)"
            >
              View Details
            </button>

            <a
              :href="
                supportMessage(
                  `Hello ${order.customer?.name || ''}, we are checking vendor availability for your order.`
                )
              "
              target="_blank"
              rel="noopener"
              class="flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 py-3 text-sm font-bold text-emerald-400 transition hover:bg-emerald-500/10"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

    </section>


    <!-- ================= ORDER DETAILS MODAL ================= -->

    <Teleport to="body">

      <div
        v-if="selectedOrder"
        class="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-5"
        @click.self="closeOrder"
      >

        <div
          class="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-zinc-800 bg-zinc-950 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
        >

          <!-- Modal Header -->

          <div
            class="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-5 py-4 sm:px-7"
          >

            <div>

              <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Order Details
              </p>

              <h2 class="mt-1 text-xl font-black text-white">
                {{ selectedOrder.customer?.name || 'Customer Order' }}
              </h2>

            </div>


            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
              @click="closeOrder"
            >
              ×
            </button>

          </div>


          <!-- Modal Content -->

          <div class="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">

            <!-- Customer Information -->

            <section>

              <div class="mb-4 flex items-center justify-between">

                <h3 class="font-bold text-white">
                  Customer Information
                </h3>

                <a
                  v-if="selectedOrder.customer?.phone"
                  :href="
                    supportMessage(
                      `Hello ${selectedOrder.customer?.name || ''}, we are checking the availability of your order.`
                    )
                  "
                  target="_blank"
                  rel="noopener"
                  class="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20"
                >
                  WhatsApp
                </a>

              </div>


              <div class="grid gap-3 sm:grid-cols-2">

                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Name
                  </p>

                  <p class="mt-1 text-sm font-semibold text-white">
                    {{ selectedOrder.customer?.name || '—' }}
                  </p>

                </div>


                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    WhatsApp
                  </p>

                  <p class="mt-1 break-all text-sm font-semibold text-white">
                    {{ selectedOrder.customer?.phone || '—' }}
                  </p>

                </div>


                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    City
                  </p>

                  <p class="mt-1 text-sm font-semibold text-white">
                    {{ selectedOrder.customer?.city || '—' }}
                  </p>

                </div>


                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Email
                  </p>

                  <p class="mt-1 break-all text-sm font-semibold text-white">
                    {{ selectedOrder.customer?.email || '—' }}
                  </p>

                </div>


                <div class="sm:col-span-2">

                  <div class="rounded-xl bg-zinc-900 p-4">

                    <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                      Delivery Address
                    </p>

                    <p class="mt-1 break-words text-sm leading-6 text-zinc-300">
                      {{ selectedOrder.customer?.address || '—' }}
                    </p>

                  </div>

                </div>

              </div>

            </section>


            <!-- Products -->

            <section class="mt-8">

              <h3 class="mb-4 font-bold text-white">
                Ordered Products
              </h3>


              <div class="space-y-2">

                <div
                  v-for="item in selectedOrder.items || []"
                  :key="item.id"
                  class="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
                >

                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.name"
                    class="h-16 w-16 shrink-0 rounded-xl object-cover"
                  >

                  <div
                    v-else
                    class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-xs text-zinc-600"
                  >
                    IMG
                  </div>


                  <div class="min-w-0 flex-1">

                    <p class="break-words text-sm font-bold text-white">
                      {{ item.name }}
                    </p>

                    <p class="mt-1 text-xs text-zinc-600">
                      Qty: {{ item.quantity }}
                    </p>

                    <p class="mt-2 text-sm font-bold text-zinc-300">
                      Rs {{ Number(item.price || 0).toLocaleString() }}
                    </p>

                  </div>


                  <div class="shrink-0 text-right">

                    <p class="text-[10px] uppercase tracking-wider text-zinc-700">
                      Total
                    </p>

                    <p class="mt-1 text-sm font-black text-white">
                      Rs {{
                        (
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString()
                      }}
                    </p>

                  </div>

                </div>

              </div>

            </section>


            <!-- Payment / Status -->

            <section class="mt-8">

              <div class="grid gap-3 sm:grid-cols-2">

                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Payment Method
                  </p>

                  <p class="mt-1 text-sm font-bold text-white">
                    {{ selectedOrder.paymentMethod || '—' }}
                  </p>

                  <p class="mt-2 text-xs leading-5 text-amber-500">
                    Payment should only be requested after vendor availability
                    is confirmed.
                  </p>

                </div>


                <div class="rounded-xl bg-zinc-900 p-4">

                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Order Status
                  </p>

                  <select
                    :value="selectedOrder.status"
                    class="mt-2 field"
                    @change="changeStatus(selectedOrder, $event.target.value)"
                  >

                    <option
                      v-for="status in orderStatuses"
                      :key="status"
                      :value="status"
                    >
                      {{ status }}
                    </option>

                  </select>

                </div>

              </div>

            </section>


            <!-- Notes -->

            <section
              v-if="selectedOrder.notes"
              class="mt-8"
            >

              <h3 class="mb-3 font-bold text-white">
                Customer Notes
              </h3>

              <div
                class="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-zinc-400"
              >
                {{ selectedOrder.notes }}
              </div>

            </section>


            <!-- Total -->

            <section class="mt-8">

              <div
                class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
              >

                <div class="flex justify-between text-sm text-zinc-500">

                  <span>
                    Subtotal
                  </span>

                  <span class="text-zinc-300">
                    Rs {{
                      Number(
                        selectedOrder.totals?.subtotal || 0
                      ).toLocaleString()
                    }}
                  </span>

                </div>


                <div
                  class="mt-4 flex justify-between border-t border-zinc-800 pt-4"
                >

                  <span class="text-lg font-black text-white">
                    Total
                  </span>

                  <span class="text-xl font-black text-white">
                    Rs {{
                      Number(
                        selectedOrder.totals?.total || 0
                      ).toLocaleString()
                    }}
                  </span>

                </div>

              </div>

            </section>

          </div>


          <!-- Modal Footer -->

          <div
            class="flex shrink-0 flex-col gap-3 border-t border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:justify-end sm:p-5"
          >

            <button
              type="button"
              class="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              @click="closeOrder"
            >
              Close
            </button>


            <a
              v-if="selectedOrder"
              :href="
                supportMessage(
                  `Hello ${selectedOrder.customer?.name || ''}, we are checking vendor availability for your order.`
                )
              "
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
            >
              Contact Customer on WhatsApp
            </a>

          </div>

        </div>

      </div>

    </Teleport>

  </AdminShell>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import AdminShell from './AdminShell.vue'
import { orderStatuses } from '../../data/constants'
import { useOrderStore } from '../../stores/orders'
import { supportMessage } from '../../utils/whatsapp'

const orders = useOrderStore()

const selectedOrder = ref(null)


const pendingCount = computed(() => {
  return orders.orders.filter(order =>
    [
      'Pending Confirmation',
      'Vendor Checking'
    ].includes(order.status)
  ).length
})


const confirmedCount = computed(() => {
  return orders.orders.filter(order =>
    [
      'Confirmed',
      'Bought from Vendor',
      'Packed',
      'Dispatched',
      'Delivered'
    ].includes(order.status)
  ).length
})


function itemPreview(order) {

  if (!order.items?.length) {
    return 'No products'
  }

  return order.items
    .map(item =>
      `${item.name} × ${item.quantity}`
    )
    .join(', ')
}


function openOrder(order) {
  selectedOrder.value = order
}


function closeOrder() {
  selectedOrder.value = null
}


async function changeStatus(order, status) {

  try {

    await orders.updateStatus(
      order.id,
      status
    )

    /*
     * Keep the modal synchronized with
     * the updated Pinia order.
     */

    if (
      selectedOrder.value &&
      selectedOrder.value.id === order.id
    ) {
      selectedOrder.value.status = status
    }

  } catch (error) {

    console.error(
      'Failed to update order status:',
      error
    )

    alert(
      'Unable to update the order status.'
    )

  }

}


onMounted(async () => {
  await orders.fetchOrders()
})
</script>
```
