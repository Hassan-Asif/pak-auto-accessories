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
        class="aspect-[4/4.2] w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </RouterLink>

    <div class="space-y-2 p-3 md:space-y-4 md:p-5">

      <!-- Category -->
      <span
        class="inline-flex rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase text-zinc-700 md:px-3 md:text-xs"
      >
        {{ product.category }}
      </span>

      <!-- Product Name -->
      <RouterLink
        :to="`/products/${product.id}`"
        class="block text-sm font-bold leading-5 text-zinc-900 transition hover:text-black md:text-xl"
      >
        {{ product.name }}
      </RouterLink>

      <!-- Vehicle Compatibility -->
      <div
        v-if="fitsSelectedVehicle"
        class="rounded-lg border border-green-200 bg-green-50 p-2 md:rounded-xl md:p-3"
      >
        <p class="text-[11px] font-semibold text-green-700 md:text-sm">
          ✓ Fits Your Selected Vehicle
        </p>
      </div>

      <!-- Price -->
      <div class="flex items-end justify-between gap-2">

        <div>
          <p class="text-lg font-black text-zinc-900 md:text-2xl">
            Rs {{ Number(product.sellingPrice || product.price || 0).toLocaleString() }}
          </p>
        </div>

        <RouterLink
          :to="`/products/${product.id}`"
          class="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 md:rounded-xl md:px-5 md:py-3 md:text-sm"
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