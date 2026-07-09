<template>
  <article
    class="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <!-- Image -->
    <RouterLink :to="`/products/${product.id}`" class="block overflow-hidden">
      <img
        :src="product.images?.[0] || 'https://placehold.co/600x600?text=No+Image'"
        :alt="product.name"
        loading="lazy"
        class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </RouterLink>

    <div class="space-y-4 p-5">

      <!-- Category -->
      <span
        class="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
      >
        {{ product.category }}
      </span>

      <!-- Product Name -->
      <RouterLink
        :to="`/products/${product.id}`"
        class="block text-xl font-bold text-zinc-900 transition hover:text-black"
      >
        {{ product.name }}
      </RouterLink>

      <!-- Vehicle Compatibility -->
      <div
        v-if="fitsSelectedVehicle"
        class="rounded-xl border border-green-200 bg-green-50 p-3"
      >
        <p class="text-sm font-semibold text-green-700">
          ✓ Fits Your Selected Vehicle
        </p>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">

        <div>
          <p class="text-2xl font-black text-zinc-900">
            Rs {{ Number(product.sellingPrice || product.price || 0).toLocaleString() }}
          </p>
        </div>

        <RouterLink
          :to="`/products/${product.id}`"
          class="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          View Product
        </RouterLink>

      </div>

    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const selectedVehicle = localStorage.getItem('selectedVehicle')

const fitsSelectedVehicle = computed(() => {
  if (!selectedVehicle) return false

  return (
    props.product.compatibleVehicles?.some(
      vehicle => vehicle.id === selectedVehicle
    ) ?? false
  )
})
</script>