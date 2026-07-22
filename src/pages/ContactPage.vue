<template>
  <main class="min-h-screen bg-zinc-50">

    <!-- Hero -->

    <section class="bg-white py-24">

      <div class="container-page">

        <div class="mx-auto max-w-3xl text-center">

          <span
            class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
          >
            Contact Us
          </span>

          <h1
            class="mt-8 text-5xl font-black leading-tight text-zinc-900 md:text-6xl"
          >
            We're Here
            <br>
            To Help
          </h1>

          <p
            class="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-600"
          >
            Need help choosing the right accessory?
            Have questions about compatibility, delivery,
            or an existing order?

            Our team is always ready to assist you.
          </p>

          <div
            class="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >

            <a
              :href="supportMessage('Hello, I need help with my order.')"
              target="_blank"
              rel="noopener"
              class="rounded-2xl bg-black px-8 py-4 text-center font-semibold text-white transition hover:bg-zinc-800"
            >
              💬 WhatsApp Us
            </a>

            <RouterLink
              to="/products"
              class="rounded-2xl border border-zinc-300 bg-white px-8 py-4 text-center font-semibold text-black transition hover:bg-zinc-100"
            >
              Browse Products
            </RouterLink>

          </div>

        </div>

      </div>

    </section>

    <!-- Contact Cards -->

    <section class="py-20">

      <div class="container-page">

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div
            v-for="card in cards"
            :key="card.title"
            class="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-2 hover:shadow-xl md:p-8"
          >

            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-3xl"
            >
              {{ card.icon }}
            </div>

            <h3
              class="text-lg font-bold text-zinc-900 md:text-xl"
            >
              {{ card.title }}
            </h3>

            <p
              class="mt-3 text-sm leading-7 text-zinc-600"
            >
              {{ card.description }}
            </p>

          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<script setup>
import { supportMessage } from '../utils/whatsapp'

const cards = [
  {
    icon: '💬',
    title: 'WhatsApp',
    description:
      'Get quick assistance, product recommendations and compatibility guidance.'
  },
  {
    icon: '📍',
    title: 'Location',
    description:
      'Karachi, Pakistan\nNationwide Delivery Available'
  },
  {
    icon: '🚚',
    title: 'Delivery',
    description:
      'Fast and secure delivery across Pakistan.'
  },
  {
    icon: '⏰',
    title: 'Support Hours',
    description:
      'Monday - Saturday\n10:00 AM - 8:00 PM'
  }
]
</script>