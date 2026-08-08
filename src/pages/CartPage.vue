<template>
  <main class="min-h-screen bg-zinc-50 py-16">

<div class="container-page">

  <!-- ================= HEADER ================= -->

  <div class="mb-8 sm:mb-12">

    <span
      class="inline-flex rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white sm:px-4 sm:py-2 sm:text-xs"
    >
      Shopping Cart
    </span>

    <h1
      class="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:mt-5 sm:text-4xl lg:text-5xl"
    >
      Your Cart
    </h1>

    <p
      class="mt-2 text-sm text-zinc-600 sm:mt-3 sm:text-base lg:text-lg"
    >
      Review your selected products before checkout.
    </p>

  </div>


  <!-- ================= EMPTY CART ================= -->

  <div
    v-if="!cart.items.length"
    class="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-16 lg:p-20"
  >

    <div
      class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl"
    >
      🛒
    </div>

    <h2
      class="mt-6 text-2xl font-black text-zinc-900 sm:text-3xl"
    >
      Your cart is empty
    </h2>

    <p
      class="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base"
    >
      Looks like you haven't added anything yet.
      Browse our collection and find something for your car.
    </p>

    <RouterLink
      to="/products"
      class="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:mt-8 sm:w-auto sm:px-8 sm:py-4"
    >
      Browse Products →
    </RouterLink>

  </div>


  <!-- ================= CART ================= -->

  <div
    v-else
    class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10"
  >

    <!-- PRODUCTS -->

    <div class="space-y-3 sm:space-y-4">

      <!-- Cart Item -->

      <div
        v-for="item in cart.items"
        :key="item.id"
        class="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:rounded-3xl sm:p-5"
      >

        <div class="flex gap-3 sm:gap-5">

          <!-- Image -->

          <RouterLink
            :to="`/products/${item.id}`"
            class="shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:rounded-2xl"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="h-24 w-24 object-cover sm:h-32 sm:w-32"
            />
          </RouterLink>


          <!-- Product Information -->

          <div class="min-w-0 flex-1">

            <p
              class="text-[10px] font-bold uppercase tracking-wider text-zinc-400 sm:text-xs"
            >
              {{ item.category }}
            </p>

            <RouterLink
              :to="`/products/${item.id}`"
              class="mt-1 block line-clamp-2 text-sm font-bold leading-5 text-zinc-900 transition hover:text-zinc-500 sm:text-lg sm:leading-6"
            >
              {{ item.name }}
            </RouterLink>

            <p
              class="mt-2 text-lg font-black text-zinc-900 sm:mt-3 sm:text-2xl"
            >
              Rs {{ Number(item.price).toLocaleString() }}
            </p>

            <!-- Quantity + Remove -->

            <div
              class="mt-3 flex flex-wrap items-center gap-3 sm:mt-4"
            >

              <!-- Quantity -->

              <div
                class="flex items-center overflow-hidden rounded-xl border border-zinc-300"
              >

                <button
                  type="button"
                  class="flex h-9 w-9 items-center justify-center text-lg text-black transition hover:bg-zinc-100 active:bg-zinc-200 sm:h-10 sm:w-10"
                  @click="
                    cart.updateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  "
                >
                  −
                </button>

                <span
                  class="flex h-9 w-9 items-center justify-center border-x border-zinc-200 text-sm font-bold text-black sm:h-10 sm:w-10"
                >
                  {{ item.quantity }}
                </span>

                <button
                  type="button"
                  class="flex h-9 w-9 items-center justify-center text-lg text-black transition hover:bg-zinc-100 active:bg-zinc-200 sm:h-10 sm:w-10"
                  @click="
                    cart.updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  "
                >
                  +
                </button>

              </div>


              <!-- Remove -->

              <button
                type="button"
                class="text-xs font-semibold text-red-500 transition hover:text-red-700 sm:text-sm"
                @click="cart.remove(item.id)"
              >
                Remove
              </button>

            </div>

          </div>


          <!-- Item Total -->

          <div
            class="hidden shrink-0 text-right sm:block"
          >
            <p class="text-xs text-zinc-400">
              Total
            </p>

            <p class="mt-1 text-lg font-black text-zinc-900">
              Rs {{ (item.price * item.quantity).toLocaleString() }}
            </p>
          </div>

        </div>

      </div>

    </div>


    <!-- ================= SUMMARY ================= -->

    <aside
      class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 lg:sticky lg:top-20"
    >

      <div class="flex items-center justify-between">

        <h2 class="text-xl font-bold text-zinc-900 sm:text-2xl">
          Order Summary
        </h2>

        <span
          class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600"
        >
          {{ cart.count }} {{ cart.count === 1 ? 'item' : 'items' }}
        </span>

      </div>


      <!-- Summary -->

      <div class="mt-6 space-y-4 sm:mt-8">

        <div class="flex justify-between text-sm">

          <span class="text-zinc-500">
            Items
          </span>

          <span class="font-medium text-zinc-900">
            {{ cart.count }}
          </span>

        </div>


        <div class="flex justify-between text-sm">

          <span class="text-zinc-500">
            Subtotal
          </span>

          <span class="font-medium text-zinc-900">
            Rs {{ cart.subtotal.toLocaleString() }}
          </span>

        </div>


        <div
          class="border-t border-zinc-200 pt-5"
        >

          <div
            class="flex items-center justify-between gap-4"
          >

            <span class="text-lg font-bold text-zinc-900">
              Total
            </span>

            <span
              class="text-xl font-black text-zinc-900 sm:text-2xl"
            >
              Rs {{ cart.subtotal.toLocaleString() }}
            </span>

          </div>

        </div>

      </div>


      <!-- Checkout -->

      <RouterLink
        to="/checkout"
        class="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 text-sm font-bold text-white shadow-lg transition hover:bg-zinc-800 active:scale-[0.99] sm:mt-8 sm:py-4.5 sm:text-base"
      >
        Proceed to Checkout
        <span class="ml-2">
          →
        </span>
      </RouterLink>


      <!-- Continue Shopping -->

      <RouterLink
        to="/products"
        class="mt-3 flex w-full items-center justify-center rounded-xl border border-zinc-300 py-3.5 text-sm font-semibold text-zinc-900 transition hover:border-black hover:bg-zinc-50"
      >
        Continue Shopping
      </RouterLink>


      <!-- Trust -->

      <div
        class="mt-6 rounded-2xl bg-zinc-50 p-4 sm:mt-7 sm:p-5"
      >

        <p class="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Shopping with confidence
        </p>

        <div class="mt-3 space-y-2.5 text-xs text-zinc-600 sm:text-sm">

          <p>
            ✓ Order confirmation before payment
          </p>

          <p>
            ✓ Nationwide delivery
          </p>

          <p>
            ✓ WhatsApp support available
          </p>

        </div>

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
