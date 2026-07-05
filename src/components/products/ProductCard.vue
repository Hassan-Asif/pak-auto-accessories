<template>
  <article class="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 transition hover:border-brake">
    <RouterLink :to="`/products/${product.id}`">
      <img :src="product.images?.[0]" :alt="product.name" loading="lazy" class="aspect-[4/3] w-full object-cover" />
    </RouterLink>
    <div class="space-y-3 p-4">
      <StatusBadge :label="product.availabilityStatus" />
      <div>
        <p class="text-xs uppercase text-zinc-500">{{ product.category }} · {{ product.carBrand }}</p>
        <p class="text-red-500 text-xs"></p>
        <RouterLink :to="`/products/${product.id}`" class="mt-1 block font-bold hover:text-red-200">{{ product.name }}</RouterLink>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg font-black">Rs {{ Number(product.sellingPrice || product.price).toLocaleString() }}</p>
        <button class="btn-secondary px-3 py-2" :disabled="product.availabilityStatus === 'Out of Stock'" @click="cart.add(product)">
          Add
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import StatusBadge from '../shared/StatusBadge.vue'
import { useCartStore } from '../../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

console.log("CARD PRODUCT", props.product)
const cart = useCartStore()
</script>
