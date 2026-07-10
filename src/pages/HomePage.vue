<template>
  <main>
    <section class="relative overflow-hidden bg-white py-24">
      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85" alt="Performance car accessories" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>
      <div class="container-page grid items-center gap-16 lg:grid-cols-2">
        <div class="max-w-2xl">
          <!-- <p class="text-sm font-bold uppercase tracking-wide text-red-200">Pakistan's Trusted Car Accessories Store</p>
          <h1 class="mt-4 text-5xl font-black leading-tight sm:text-6xl">Everything Your Car Deserves.</h1>
          <p class="mt-5 text-lg text-zinc-300">Discover high-quality LED lights, interior upgrades, exterior styling, and car care products. We verify availability before processing your order to ensure a smooth, reliable shopping experience.</p> -->
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
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
</div>

<VehicleSelector />
          <div class="mt-10 grid grid-cols-3 gap-4 text-sm text-zinc-300">
            <!-- <div><strong class="block text-2xl text-white">0</strong> Pre-confirmation payments</div> -->
            <!-- <div><strong class="block text-2xl text-white">2-3</strong> Day usual dispatch</div> -->
            <!-- <div><strong class="block text-2xl text-white">PK</strong> Nationwide delivery</div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="container-page py-16">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="text-sm font-bold uppercase text-brake">Featured categories</p>
          <h2 class="mt-2 text-3xl font-black">Built for Pakistani drivers</h2>
        </div>
        <RouterLink to="/categories" class="hidden text-sm font-bold text-red-200 sm:block">View all</RouterLink>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <CategoryCard v-for="category in productStore.categories" :key="category.id" :category="category" />
      </div>
    </section> -->

    <section class="bg-zinc-50 py-24">
      <div class="container-page">
        <div class="mb-8">
          <p class="text-sm font-bold uppercase text-brake">Featured products</p>
          <h2 class="mt-2 text-3xl font-black text-black">Popular this week</h2>
        </div>
        <div class="grid gap-6 grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="bg-white py-24">

  <div class="container-page">

    <div class="mb-16 max-w-3xl">

      <span
        class="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
      >
        Why Choose Us
      </span>

      <h2
        class="mt-6 text-5xl font-black text-zinc-900"
      >
        Trusted Accessories.<br>
        Exceptional Service.
      </h2>

      <p
        class="mt-6 text-lg leading-8 text-zinc-600"
      >
        Every product is carefully selected for quality, compatibility and
        reliability. We confirm availability before payment and provide
        professional support from inquiry to delivery.
      </p>

    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div
        v-for="item in why"
        :key="item.title"
        class="group rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      >

        <div
          class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl"
        >
          {{ item.icon }}
        </div>

        <h3
          class="text-xl font-bold text-zinc-900"
        >
          {{ item.title }}
        </h3>

        <p
          class="mt-4 leading-7 text-zinc-600"
        >
          {{ item.description }}
        </p>

      </div>

    </div>

  </div>

</section>

    <section class="bg-white py-16 text-zinc-950">
      <div class="container-page">
        <h2 class="text-3xl font-black">Customer reviews</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <blockquote v-for="review in reviews" :key="review.name" class="rounded-lg border border-zinc-300 p-5">
            <p class="text-sm">"{{ review.text }}"</p>
            <footer class="mt-4 font-bold">{{ review.name }}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import VehicleSelector from '../components/VehicleSelector.vue'
import CategoryCard from '../components/products/CategoryCard.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { useProductStore } from '../stores/products'
import { supportMessage } from '../utils/whatsapp'

const productStore = useProductStore()
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
  { name: 'Ali R. · Lahore', text: 'They confirmed the LED model on WhatsApp before asking for payment. Smooth delivery.' },
  { name: 'Maham S. · Islamabad', text: 'Clean product details and honest availability status. That mattered.' },
  { name: 'Hamza K. · Karachi', text: 'Owner kit arrived packed well and exactly as confirmed.' }
]

onMounted(() => productStore.fetchProducts())
</script>
