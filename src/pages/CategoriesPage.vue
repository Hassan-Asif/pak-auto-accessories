<template>
  <main class="min-h-screen bg-zinc-50 py-16">

    <div class="container-page">

      <!-- Hero -->

      <div class="max-w-3xl">

        <span
          class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
        >
          Categories
        </span>

        <h1 class="mt-5 text-5xl font-black text-zinc-900">
          Shop by Category
        </h1>

        <p class="mt-5 text-lg leading-8 text-zinc-600">
          Explore our complete collection of premium automotive accessories,
          lighting, detailing, interior upgrades and styling products for
          every vehicle.
        </p>

      </div>

      <!-- Stats -->

      <!-- <div class="mt-12 grid gap-6 sm:grid-cols-3"> -->

        <!-- <div class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h3 class="text-4xl font-black text-black">
            {{ productStore.categories.length }}
          </h3>

          <p class="mt-2 text-zinc-500">
            Categories
          </p>

        </div>

        <div class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h3 class="text-4xl font-black">
            500+
          </h3>

          <p class="mt-2 text-zinc-500">
            Products
          </p>

        </div>

        <div class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h3 class="text-4xl font-black">
            24/7
          </h3>

          <p class="mt-2 text-zinc-500">
            WhatsApp Support
          </p>

        </div>

      </div> -->

      <!-- Categories -->

      <section class="mt-16">

        <div class="mb-8 flex items-center justify-between">

          <div>

            <h2 class="text-3xl font-black text-zinc-900">
              Browse Categories
            </h2>

            <p class="mt-2 text-zinc-500">
              Choose a category to explore compatible products.
            </p>

          </div>

        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          <CategoryCard
            v-for="category in productStore.categories"
            :key="category.id"
            :category="category"
          />

        </div>

      </section>

    </div>

  </main>
</template>

<script setup>
import CategoryCard from '../components/products/CategoryCard.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
</script>