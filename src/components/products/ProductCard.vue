<template>
  <RouterLink
    :to="`/products/${product.id}`"
    class="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] sm:rounded-3xl"
  >
    <!-- ================= IMAGE ================= -->
    <div class="overflow-hidden bg-zinc-100">
      <img
        :src="
          product.images?.[0] ||
          'https://placehold.co/600x600?text=No+Image'
        "
        :alt="product.name"
        loading="lazy"
        class="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <!-- ================= CONTENT ================= -->
    <div
      class="space-y-2 p-3 sm:space-y-3 sm:p-4 lg:space-y-4 lg:p-5"
    >
      <!-- ================= CATEGORY ================= -->
      <div
        class="flex min-w-0 items-center gap-1.5 overflow-hidden"
      >
        <!-- Main Category -->
        <span
          v-if="product.category"
          class="max-w-[70%] truncate rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-zinc-700 sm:max-w-none sm:px-3 sm:text-xs"
        >
          {{ product.category }}
        </span>

        <!-- Small Subcategory -->
        <span
          v-if="product.subcategory"
          class="min-w-0 truncate text-[10px] font-medium text-zinc-400 sm:text-xs"
        >
          · {{ product.subcategory }}
        </span>
      </div>

      <!-- ================= PRODUCT NAME ================= -->
      <h3
        class="line-clamp-2 text-sm font-bold leading-5 text-zinc-900 transition group-hover:text-black sm:min-h-[2.8rem] sm:text-base sm:leading-6 lg:text-xl"
      >
        {{ product.name }}
      </h3>

      <!-- ================= COMPATIBILITY ================= -->
      <!--
      <div
        v-if="fitsSelectedVehicle"
        class="rounded-lg border border-green-200 bg-green-50 p-2"
      >
        <p class="text-[11px] font-semibold text-green-700 sm:text-sm">
          ✓ Fits Your Selected Vehicle
        </p>
      </div>
      -->

      <!-- ================= BOTTOM ================= -->
      <div
        class="mt-3 flex min-w-0 items-end justify-between gap-2 border-t border-zinc-100 pt-3 sm:mt-4 sm:gap-3 sm:pt-4"
      >
        <!-- ================= PRICE ================= -->
        <div class="min-w-0 flex-1">
          <p
            class="text-[9px] font-medium uppercase tracking-wider text-zinc-400 sm:text-xs"
          >
            Price
          </p>

          <p
            class="mt-0.5 whitespace-nowrap text-sm font-black text-zinc-900 sm:text-base lg:text-lg"
          >
            Rs
            {{
              Number(
                product.sellingPrice || product.price || 0
              ).toLocaleString()
            }}
          </p>
        </div>

        <!-- ================= DESKTOP BUTTON ================= -->
        <span
          class="hidden shrink-0 items-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-zinc-800 lg:inline-flex"
        >
          View Product
        </span>

        <!-- ================= MOBILE ARROW ================= -->
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-900 transition group-hover:bg-black group-hover:text-white sm:h-9 sm:w-9 lg:hidden"
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
      (vehicle) => vehicle.id === selectedVehicle
    ) ?? false
  )
})
</script>