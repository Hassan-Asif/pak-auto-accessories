<template>
  <main>
    <section class="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85" alt="Performance car accessories" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>
      <div class="container-page relative flex min-h-[calc(100vh-4rem)] items-center py-16">
        <div class="max-w-2xl">
          <p class="text-sm font-bold uppercase tracking-wide text-red-200">Pakistan's Trusted Car Accessories Store</p>
          <h1 class="mt-4 text-5xl font-black leading-tight sm:text-6xl">Everything Your Car Deserves.</h1>
          <p class="mt-5 text-lg text-zinc-300">Discover high-quality LED lights, interior upgrades, exterior styling, and car care products. We verify availability before processing your order to ensure a smooth, reliable shopping experience.</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink to="/products" class="btn-primary">Browse Products</RouterLink>
            <a :href="supportMessage('I want help choosing car accessories')" class="btn-secondary" target="_blank" rel="noopener">WhatsApp Support</a>
          </div>
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

    <section class="bg-zinc-950 py-16">
      <div class="container-page">
        <div class="mb-8">
          <p class="text-sm font-bold uppercase text-brake">Featured products</p>
          <h2 class="mt-2 text-3xl font-black">Popular this week</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <section class="container-page grid gap-8 py-16 lg:grid-cols-2">
      <div>
        <p class="text-sm font-bold uppercase text-brake">Why choose us</p>
        <h2 class="mt-2 text-3xl font-black">Trusted Accessories. Honest Service.</h2>
        <p class="mt-4 text-zinc-400">Every product is carefully selected for quality and compatibility. We verify availability before taking payment, provide expert fitment guidance, and ensure a smooth shopping experience from inquiry to delivery.</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div v-for="item in why" :key="item" class="rounded-lg border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-300">{{ item }}</div>
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
import CategoryCard from '../components/products/CategoryCard.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { useProductStore } from '../stores/products'
import { supportMessage } from '../utils/whatsapp'

const productStore = useProductStore()
const why = ['Verified product availability before every order.',
  'WhatsApp confirmation before any advance payment.',
  'Wide catalog sourced from trusted automotive vendors.',
  'Dedicated support from inquiry to delivery.']
const reviews = [
  { name: 'Ali R. · Lahore', text: 'They confirmed the LED model on WhatsApp before asking for payment. Smooth delivery.' },
  { name: 'Maham S. · Islamabad', text: 'Clean product details and honest availability status. That mattered.' },
  { name: 'Hamza K. · Karachi', text: 'Owner kit arrived packed well and exactly as confirmed.' }
]

onMounted(() => productStore.fetchProducts())
</script>
