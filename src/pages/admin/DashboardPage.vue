```vue
<template>
  <AdminShell>

    <section class="space-y-8">

      <!-- ================= HEADER ================= -->

      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >

        <div>

          <p
            class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
          >
            Overview
          </p>

          <h1
            class="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Dashboard
          </h1>

          <p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Manage your products, orders and store activity from one place.
          </p>

        </div>


        <RouterLink
          to="/"
          class="inline-flex w-fit items-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
        >
          View Storefront
          <span class="ml-2">↗</span>
        </RouterLink>

      </div>


      <!-- ================= STATS ================= -->

      <div
        class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      >

        <!-- Products -->

        <div
          class="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl sm:p-6"
        >

          <div class="flex items-start justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-black sm:h-12 sm:w-12"
            >
              ◈
            </div>

            <span class="text-xs font-bold text-zinc-700">
              01
            </span>

          </div>

          <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Products
          </p>

          <p class="mt-1 text-3xl font-black text-white sm:text-4xl">
            {{ products.products.length }}
          </p>

          <RouterLink
            to="/admin/products"
            class="mt-4 inline-flex text-xs font-semibold text-zinc-500 transition hover:text-white"
          >
            Manage products →
          </RouterLink>

        </div>


        <!-- Orders -->

        <div
          class="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl sm:p-6"
        >

          <div class="flex items-start justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-lg text-white sm:h-12 sm:w-12"
            >
              □
            </div>

            <span class="text-xs font-bold text-zinc-700">
              02
            </span>

          </div>

          <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Orders
          </p>

          <p class="mt-1 text-3xl font-black text-white sm:text-4xl">
            {{ orders.orders.length }}
          </p>

          <RouterLink
            to="/admin/orders"
            class="mt-4 inline-flex text-xs font-semibold text-zinc-500 transition hover:text-white"
          >
            View orders →
          </RouterLink>

        </div>


        <!-- Pending -->

        <div
          class="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl sm:p-6"
        >

          <div class="flex items-start justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-400 sm:h-12 sm:w-12"
            >
              !
            </div>

            <span class="text-xs font-bold text-zinc-700">
              03
            </span>

          </div>

          <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Pending
          </p>

          <p class="mt-1 text-3xl font-black text-white sm:text-4xl">
            {{ pending }}
          </p>

          <RouterLink
            to="/admin/orders"
            class="mt-4 inline-flex text-xs font-semibold text-zinc-500 transition hover:text-white"
          >
            Review pending →
          </RouterLink>

        </div>


        <!-- Profit -->

        <div
          class="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl sm:p-6"
        >

          <div class="flex items-start justify-between">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg text-emerald-400 sm:h-12 sm:w-12"
            >
              Rs
            </div>

            <span class="text-xs font-bold text-zinc-700">
              04
            </span>

          </div>

          <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Profit Potential
          </p>

          <p
            class="mt-1 break-words text-2xl font-black text-white sm:text-3xl"
          >
            Rs {{ profit.toLocaleString() }}
          </p>

          <p class="mt-4 text-xs text-zinc-600">
            Based on current product margins
          </p>

        </div>

      </div>


      <!-- ================= OPERATING MODEL ================= -->

      <div
        class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
      >

        <div class="border-b border-zinc-800 px-5 py-5 sm:px-6">

          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"
            >
              ✓
            </div>

            <div>

              <h2 class="font-bold text-white">
                Order Operating Model
              </h2>

              <p class="text-xs text-zinc-500">
                Recommended order workflow
              </p>

            </div>

          </div>

        </div>


        <div class="p-5 sm:p-6">

          <p
            class="max-w-3xl text-sm leading-7 text-zinc-400"
          >
            Orders should move from
            <span class="font-semibold text-white">
              Pending Confirmation
            </span>
            to
            <span class="font-semibold text-white">
              Vendor Checking
            </span>
            before requesting any customer payment.
            Confirm vendor availability first, then contact the customer
            on WhatsApp.
          </p>


          <!-- Workflow -->

          <div
            class="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
          >

            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Step 01
              </span>

              <p class="mt-2 text-sm font-bold text-white">
                Order Received
              </p>

              <p class="mt-1 text-xs text-zinc-600">
                Customer submits order
              </p>
            </div>


            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Step 02
              </span>

              <p class="mt-2 text-sm font-bold text-white">
                Vendor Checking
              </p>

              <p class="mt-1 text-xs text-zinc-600">
                Confirm availability
              </p>
            </div>


            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Step 03
              </span>

              <p class="mt-2 text-sm font-bold text-white">
                Confirm Order
              </p>

              <p class="mt-1 text-xs text-zinc-600">
                Contact customer
              </p>
            </div>


            <div
              class="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <span class="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Step 04
              </span>

              <p class="mt-2 text-sm font-bold text-white">
                Process
              </p>

              <p class="mt-1 text-xs text-zinc-600">
                Payment & delivery
              </p>
            </div>

          </div>

        </div>

      </div>


      <!-- ================= QUICK ACTIONS ================= -->

      <div>

        <div class="mb-4">

          <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Quick Actions
          </p>

        </div>


        <div class="grid gap-3 sm:grid-cols-3">

          <RouterLink
            to="/admin/products"
            class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600 hover:bg-zinc-800"
          >

            <p class="font-bold text-white">
              Manage Products
            </p>

            <p class="mt-1 text-sm text-zinc-500">
              Add or update store products.
            </p>

          </RouterLink>


          <RouterLink
            to="/admin/orders"
            class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600 hover:bg-zinc-800"
          >

            <p class="font-bold text-white">
              Manage Orders
            </p>

            <p class="mt-1 text-sm text-zinc-500">
              Check and update customer orders.
            </p>

          </RouterLink>


          <RouterLink
            to="/"
            class="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-600 hover:bg-zinc-800"
          >

            <p class="font-bold text-white">
              Open Storefront
            </p>

            <p class="mt-1 text-sm text-zinc-500">
              Preview the customer website.
            </p>

          </RouterLink>

        </div>

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


const pending = computed(() =>
  orders.orders.filter(order =>
    [
      'Pending Confirmation',
      'Vendor Checking'
    ].includes(order.status)
  ).length
)


const profit = computed(() =>
  products.products.reduce(
    (sum, product) =>
      sum + Number(product.profit || 0),
    0
  )
)


onMounted(() => {
  products.fetchAdminProducts()
  orders.fetchOrders()
})
</script>
```
