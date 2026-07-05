<template>
  <main v-if="product" class="container-page grid gap-10 py-12 lg:grid-cols-2">
    <div>
      <img :src="selectedImage" :alt="product.name" class="aspect-square w-full rounded-lg object-cover" />
      <div class="mt-4 grid grid-cols-4 gap-3">
        <button v-for="image in product.images" :key="image" class="overflow-hidden rounded-md border border-zinc-800" @click="selectedImage = image">
          <img :src="image" :alt="product.name" loading="lazy" class="aspect-square w-full object-cover" />
        </button>
      </div>
    </div>
    <section>
      <!-- <StatusBadge :label="product.availabilityStatus" /> -->
      <h1 class="mt-4 text-4xl font-black">{{ product.name }}</h1>
      <p class="mt-3 text-zinc-400">{{ product.carBrand }} {{ product.carModel }} · {{ product.category }}</p>
      <p class="mt-6 text-3xl font-black">Rs {{ Number(product.sellingPrice || product.price).toLocaleString() }}</p>
      <p class="mt-5 leading-7 text-zinc-300">{{ product.description }}</p>
      <!-- <div class="mt-6 rounded-lg border border-red-900/60 bg-red-950/20 p-4 text-sm text-red-100">
        Payment is never requested before vendor availability is confirmed on WhatsApp.
      </div> -->
      <p class="mt-4 text-sm text-zinc-400">Estimated delivery: {{ product.estimatedDelivery }}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <button class="btn-primary" :disabled="product.availabilityStatus === 'Out of Stock'" @click="cart.add(product)">Add to Cart</button>
        <a class="btn-secondary" :href="productInquiry(product)" target="_blank" rel="noopener">Ask on WhatsApp</a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import StatusBadge from '../components/shared/StatusBadge.vue'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'
import { productInquiry } from '../utils/whatsapp'

const route = useRoute()
const productStore = useProductStore()
const cart = useCartStore()
const product = ref(null)
const selectedImage = ref('')

onMounted(async () => {
  product.value = await productStore.fetchProduct(route.params.id)
  selectedImage.value = product.value?.images?.[0]
})
</script>
