<template>
  <main>
    <section class="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
<div class="absolute inset-0 overflow-hidden">
  <div
    class="flex h-full w-full transition-transform duration-1000 ease-in-out"
    :style="{
      transform: `translateX(-${currentHeroImage * 100}%)`
    }"
  >
    <div
      v-for="(image, index) in heroImages"
      :key="index"
      class="h-full w-full min-w-full flex-shrink-0"
    >
      <img
        :src="image"
        alt="Car accessories"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</div>
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>
      <div class="container-page grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
       <div class="mx-auto max-w-2xl lg:mx-0">
          <!-- <p class="text-sm font-bold uppercase tracking-wide text-red-200">Pakistan's Trusted Car Accessories Store</p>
          <h1 class="mt-4 text-5xl font-black leading-tight sm:text-6xl">Everything Your Car Deserves.</h1>
          <p class="mt-5 text-lg text-zinc-300">Discover high-quality LED lights, interior upgrades, exterior styling, and car care products. We verify availability before processing your order to ensure a smooth, reliable shopping experience.</p> -->
          <!-- <div class="mt-6 flex flex-col gap-3 sm:flex-row">
  <RouterLink
    to="/products"
    class="btn-primary"
  >
    Browse Products
  </RouterLink>

  <a
    :href="supportMessage('I want help choosing car accessories')"
    class="btn-secondary"
    target="_blank"
    rel="noopener"
  >
    WhatsApp Support
  </a>
</div> -->

<VehicleSelector />
          <div class="mt-10 grid grid-cols-3 gap-4 text-sm text-zinc-300">
            <!-- <div><strong class="block text-2xl text-white">0</strong> Pre-confirmation payments</div> -->
            <!-- <div><strong class="block text-2xl text-white">2-3</strong> Day usual dispatch</div> -->
            <!-- <div><strong class="block text-2xl text-white">PK</strong> Nationwide delivery</div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FEATURED CATEGORIES ================= -->

<section class="bg-white py-14 sm:py-18 lg:py-24">
  <div class="container-page">

    <!-- Header -->
    <div class="mb-8 flex items-end justify-between gap-4 sm:mb-10">

      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
          Explore
        </p>

        <h2
          class="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl"
        >
          Shop by Category
        </h2>

        <p class="mt-2 max-w-xl text-sm text-zinc-500 sm:text-base">
          Upgrade your car with carefully selected accessories for style,
          comfort and performance.
        </p>
      </div>

      <RouterLink
        to="/categories"
        class="hidden shrink-0 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-black hover:bg-black hover:text-white sm:inline-flex"
      >
        View All
      </RouterLink>

    </div>


    <!-- Categories -->
    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
    >

      <CategoryCard
        v-for="category in productStore.categories.slice(0, 4)"
        :key="category.id"
        :category="category"
      />

    </div>

  </div>
</section>


<!-- ================= FEATURED PRODUCTS ================= -->

<section class="bg-zinc-50 py-14 sm:py-18 lg:py-24">
  <div class="container-page">

    <!-- Header -->
    <div
      class="mb-8 flex items-end justify-between gap-4 sm:mb-10 lg:mb-12"
    >

      <div>

        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-black"></span>

          <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
            Featured Products
          </p>
        </div>

        <h2
          class="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl"
        >
          Popular This Week
        </h2>

        <p class="mt-2 text-sm text-zinc-500 sm:text-base">
          Some of our most popular car accessories.
        </p>

      </div>


      <RouterLink
        to="/products"
        class="hidden shrink-0 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:inline-flex"
      >
        Shop All
      </RouterLink>

    </div>


    <!-- Products -->
    <div
      class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5"
    >

      <ProductCard
        v-for="product in productStore.featuredProducts"
        :key="product.id"
        :product="product"
      />

    </div>


    <!-- Mobile Shop Button -->
    <RouterLink
      to="/products"
      class="mt-8 flex w-full items-center justify-center rounded-xl border border-black py-3.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white sm:hidden"
    >
      View All Products →
    </RouterLink>

  </div>
</section>


<!-- ================= WHY CHOOSE US ================= -->

<section class="bg-white py-14 sm:py-18 lg:py-24">
  <div class="container-page">

    <!-- Intro -->
    <div class="mb-10 max-w-3xl sm:mb-14 lg:mb-16">

      <span
        class="inline-flex rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-xs"
      >
        Why Choose Us
      </span>

      <h2
        class="mt-5 text-3xl font-black leading-tight tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl"
      >
        Accessories you can trust.
        <span class="text-zinc-400">
          Service you can count on.
        </span>
      </h2>

      <p
        class="mt-5 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 lg:text-lg"
      >
        We focus on quality products, accurate compatibility and honest
        availability. Every order is confirmed before payment.
      </p>

    </div>


    <!-- Features -->
    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
    >

      <div
        v-for="(item, index) in why"
        :key="item.title"
        class="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
      >

        <!-- Number -->
        <div class="flex items-center justify-between">

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-xl transition group-hover:bg-black group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl"
          >
            {{ item.icon }}
          </div>

          <span
            class="text-xs font-bold text-zinc-300"
          >
            0{{ index + 1 }}
          </span>

        </div>


        <h3
          class="mt-5 text-sm font-bold leading-5 text-zinc-900 sm:text-lg sm:leading-6"
        >
          {{ item.title }}
        </h3>

        <p
          class="mt-2 text-xs leading-5 text-zinc-500 sm:mt-3 sm:text-sm sm:leading-6"
        >
          {{ item.description }}
        </p>

      </div>

    </div>

  </div>
</section>


<!-- ================= DARK SUPPORT CTA ================= -->

<section class="bg-white pb-14 sm:pb-18 lg:pb-24">
  <div class="container-page">

    <div
      class="relative overflow-hidden rounded-3xl bg-black px-5 py-10 sm:px-8 sm:py-14 lg:px-14 lg:py-16"
    >

      <!-- Decorative circles -->
      <div
        class="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
      ></div>

      <div
        class="absolute -bottom-32 -right-10 h-72 w-72 rounded-full border border-white/5"
      ></div>


      <div
        class="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
      >

        <div class="max-w-2xl">

          <p
            class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-sm"
          >
            Need Help?
          </p>

          <h2
            class="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Not sure what fits your car?
          </h2>

          <p
            class="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7"
          >
            Tell us your vehicle model and we'll help you find the right
            accessories.
          </p>

        </div>


        <a
          :href="supportMessage('I want help choosing car accessories')"
          target="_blank"
          rel="noopener"
          class="inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98] sm:w-auto sm:px-8"
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


<!-- ================= REVIEWS ================= -->

<section class="bg-zinc-100 py-14 sm:py-18 lg:py-24">
  <div class="container-page">

    <!-- Header -->
    <div class="mb-8 sm:mb-10">

      <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
        Customer Reviews
      </p>

      <div class="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <h2
          class="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl"
        >
          What our customers say
        </h2>

        <div class="text-sm font-semibold text-zinc-500">
          ★★★★★
        </div>

      </div>

    </div>


    <!-- Reviews -->
    <div
      class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >

      <blockquote
        v-for="review in reviews"
        :key="review.name"
        class="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl sm:p-7"
      >

        <div class="flex gap-1 text-sm">
          ★★★★★
        </div>

        <p
          class="mt-5 text-sm leading-7 text-zinc-600 sm:text-base"
        >
          "{{ review.text }}"
        </p>

        <footer
          class="mt-6 border-t border-zinc-100 pt-4 text-sm font-bold text-zinc-900"
        >
          {{ review.name }}
        </footer>

      </blockquote>

    </div>

  </div>
</section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

import VehicleSelector from '../components/VehicleSelector.vue'
import CategoryCard from '../components/products/CategoryCard.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { useProductStore } from '../stores/products'
import { supportMessage } from '../utils/whatsapp'

const productStore = useProductStore()

// Hero images
const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg'
]

const currentHeroImage = ref(0)

let heroInterval

onMounted(() => {
  // Start hero image rotation
  heroInterval = setInterval(() => {
    currentHeroImage.value =
      (currentHeroImage.value + 1) % heroImages.length
  }, 4000)

  // Load products
  productStore.fetchProducts()
})

onUnmounted(() => {
  clearInterval(heroInterval)
})

const why = [
  {
    icon: '✔️',
    title: 'Verified Products',
    description:
      'Every accessory is sourced from trusted suppliers for quality and reliability.'
  },
  {
    icon: '🚗',
    title: 'Vehicle Compatibility',
    description:
      'Find products that fit your exact vehicle using our compatibility finder.'
  },
  {
    icon: '💬',
    title: 'Expert Support',
    description:
      'Need help choosing a product? Our team is available on WhatsApp.'
  },
  {
    icon: '🚚',
    title: 'Nationwide Delivery',
    description:
      'Fast and secure delivery across Pakistan with order confirmation before payment.'
  }
]

const reviews = [
  {
    name: 'Ali R. · Lahore',
    text: 'They confirmed the LED model on WhatsApp before asking for payment. Smooth delivery.'
  },
  {
    name: 'Maham S. · Islamabad',
    text: 'Clean product details and honest availability status. That mattered.'
  },
  {
    name: 'Hamza K. · Karachi',
    text: 'Owner kit arrived packed well and exactly as confirmed.'
  }
]
</script>