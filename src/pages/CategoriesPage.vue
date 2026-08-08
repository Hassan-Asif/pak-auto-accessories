<template>
  <main class="min-h-screen bg-zinc-50">

    <!-- ================= HERO ================= -->

    <section class="bg-white">
      <div class="container-page py-10 sm:py-14 lg:py-20">

        <div class="max-w-3xl">

          <!-- Badge -->
          <span
            class="inline-flex rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:px-4 sm:py-2 sm:text-xs"
          >
            Categories
          </span>

          <!-- Heading -->
          <h1
            class="mt-4 text-3xl font-black leading-tight tracking-tight text-zinc-900 sm:mt-5 sm:text-4xl lg:text-6xl"
          >
            Find the right upgrades
            <span class="text-zinc-400">
              for your car.
            </span>
          </h1>

          <!-- Description -->
          <p
            class="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg"
          >
            Explore lighting, interior upgrades, exterior styling,
            detailing products and more — all in one place.
          </p>

        </div>

      </div>
    </section>


    <!-- ================= CATEGORY CONTENT ================= -->

    <section class="py-10 sm:py-14 lg:py-20">

      <div class="container-page">

        <!-- Section Header -->
        <div
          class="mb-7 flex items-end justify-between gap-4 sm:mb-10"
        >

          <div>

            <div class="flex items-center gap-2">

              <span
                class="h-2 w-2 rounded-full bg-black"
              ></span>

              <p
                class="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-sm"
              >
                Explore
              </p>

            </div>

            <h2
              class="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl"
            >
              Browse Categories
            </h2>

            <p
              class="mt-1.5 text-sm text-zinc-500 sm:text-base"
            >
              Choose a category to start shopping.
            </p>

          </div>


          <!-- Category Count -->
          <div
            class="hidden shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm sm:block"
          >
            {{ productStore.categories.length }}
            Categories
          </div>

        </div>


        <!-- Category Grid -->
        <div
          class="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >

          <div
            v-for="category in productStore.categories"
            :key="category.id"
            class="min-w-0 overflow-hidden"
          >

            <CategoryCard
              :category="category"
            />

          </div>

        </div>


        <!-- Empty State -->
        <div
          v-if="!productStore.categories.length"
          class="rounded-2xl border border-zinc-200 bg-white p-10 text-center sm:rounded-3xl sm:p-16"
        >

          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl"
          >
            🚗
          </div>

          <h3
            class="mt-5 text-xl font-bold text-zinc-900"
          >
            No categories available
          </h3>

          <p
            class="mt-2 text-sm text-zinc-500"
          >
            Check back soon for new automotive accessories.
          </p>

        </div>

      </div>

    </section>


    <!-- ================= BOTTOM CTA ================= -->

    <section class="pb-12 sm:pb-16 lg:pb-20">

      <div class="container-page">

        <div
          class="relative overflow-hidden rounded-3xl bg-black px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
        >

          <!-- Decorative Elements -->
          <div
            class="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10"
          ></div>

          <div
            class="absolute -bottom-32 -right-10 h-72 w-72 rounded-full border border-white/5"
          ></div>


          <div
            class="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"
          >

            <div class="max-w-2xl">

              <p
                class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm"
              >
                Can't find what you need?
              </p>

              <h2
                class="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl"
              >
                Tell us what you're looking for.
              </h2>

              <p
                class="mt-3 text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7"
              >
                Send us your vehicle details and we'll help you find
                the right accessory.
              </p>

            </div>


            <a
              :href="supportMessage('I need help finding a car accessory')"
              target="_blank"
              rel="noopener"
              class="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
            >
              WhatsApp Support
              <span class="ml-2 text-lg">
                →
              </span>
            </a>

          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<script setup>
import CategoryCard from '../components/products/CategoryCard.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
</script>