<template>
  <RouterLink
    :to="`/products/${product.id}`"
    class="group block overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
  >
    <!-- Image -->
    <div class="overflow-hidden">
      <img
        :src="product.images?.[0] || 'https://placehold.co/600x600?text=No+Image'"
        :alt="product.name"
        loading="lazy"
        class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

  <!-- Content -->
<div class="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:space-y-4 lg:p-5">

  <!-- Category -->
  <span
    class="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] sm:px-3 sm:text-xs font-semibold uppercase text-zinc-700"
  >
    {{ product.category }}
  </span>

  <!-- Small Subcategory -->
  <span
    v-if="product.subcategory"
    class="ml-1 text-[10px] font-medium text-zinc-400 sm:text-xs"
  >
    · {{ product.subcategory }}
  </span>

  <!-- Product Name -->
  <h3
    class="line-clamp-2 min-h-[2.8rem] text-sm sm:text-base lg:text-xl font-bold leading-5 sm:leading-6 text-zinc-900 transition group-hover:text-black"
  >
    {{ product.name }}
  </h3>

  <!-- Compatibility -->
  <!--
  <div
    v-if="fitsSelectedVehicle"
    class="rounded-lg border border-green-200 bg-green-50 p-2"
  >
    <p class="text-[11px] sm:text-sm font-semibold text-green-700">
      ✓ Fits Your Selected Vehicle
    </p>
  </div>
  -->

  <!-- Bottom -->
  <div
    class="mt-3 flex items-end justify-between gap-3 border-t border-zinc-100 pt-3 sm:mt-4 sm:pt-4"
  >

    <!-- Price -->
    <div class="min-w-0">

      <p
        class="text-[10px] font-medium uppercase tracking-wider text-zinc-400 sm:text-xs"
      >
        Price
      </p>

      <p
        class="mt-0.5 truncate text-sm font-black text-zinc-900 sm:text-base lg:text-lg"
      >
        Rs {{ Number(product.sellingPrice || product.price || 0).toLocaleString() }}
      </p>

    </div>

    <!-- Desktop Button
    <span
      class="hidden lg:inline-flex items-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-zinc-800"
    >
      View Product
    </span> -->

    <!-- Mobile Arrow -->
    <span
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-900 transition group-hover:bg-black group-hover:text-white lg:hidden"
    >
      →
    </span>

  </div>

</div>

    
  </RouterLink>
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