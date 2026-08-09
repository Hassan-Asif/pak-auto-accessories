```vue
<template>
  <main class="min-h-[70vh] bg-zinc-50 px-4 py-12 sm:py-16 lg:py-24">

    <div class="container-page">

      <div
        class="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-10 lg:p-14"
      >

        <!-- Success Icon -->
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-4xl"
        >
          ✔️
        </div>

        <!-- Heading -->
        <p
          class="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
        >
          Order Received
        </p>

        <h1
          class="mt-3 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl"
        >
          Thank You for Your Order!
        </h1>

        <!-- Message -->
        <p
          class="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8"
        >
          We really appreciate your order. Our team will now check product
          availability with our vendor before confirming your order.
        </p>

        <p
          class="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500"
        >
          You will be contacted on WhatsApp once availability has been
          confirmed. <strong class="text-zinc-800">
            Payment will only be requested after confirmation.
          </strong>
        </p>

        <!-- Status -->
        <div
          class="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-left"
        >

          <div class="flex items-start gap-4">

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-lg text-white"
            >
              📦
            </div>

            <div>

              <h2 class="font-bold text-zinc-900">
                What's next?
              </h2>

              <p class="mt-1 text-sm leading-6 text-zinc-500">
                We'll verify availability, confirm your order and then
                arrange delivery.
              </p>

            </div>

          </div>

        </div>

        <!-- Buttons -->
        <div
          class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >

          <a
            :href="supportMessage('Hi, I just placed an order and would like to confirm the availability.')"
            class="inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:w-auto"
            target="_blank"
            rel="noopener"
          >
            Message on WhatsApp
            <span class="ml-2">→</span>
          </a>

          <RouterLink
            to="/products"
            class="inline-flex w-full items-center justify-center rounded-xl border border-zinc-300 px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:border-black hover:bg-zinc-100 sm:w-auto"
          >
            Continue Shopping
          </RouterLink>

        </div>

        <!-- Small Footer Note -->
        <p class="mt-8 text-xs text-zinc-400">
          Thank you for choosing NeonLEDs.
        </p>

      </div>

    </div>

  </main>
</template>


<script setup>
import { supportMessage } from '../utils/whatsapp'
</script>
```
