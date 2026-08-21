<template>
  <RouterLink
    :to="{
      path: '/products',
      query: {
        category: category.name
      }
    }"
    class="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-zinc-100">
      <img
        v-if="category.image"
        :src="category.image"
        :alt="category.name"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-zinc-100 text-4xl"
      >
        🚗
      </div>

      <!-- Image Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
      ></div>

      <!-- Arrow -->
      <!-- <div
        class="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition duration-300 group-hover:scale-110"
      >
        →
      </div> -->
    </div>

    <!-- Content -->
    <div class="p-4 sm:p-5">
      <div class="flex items-center justify-between gap-3">
        <h3
          class="text-base font-black text-zinc-900 sm:text-lg"
        >
          {{ category.name }}
        </h3>
      </div>

      <p
        v-if="category.subcategories?.length"
        class="mt-1 text-xs text-zinc-500 sm:text-sm"
      >
        <!-- {{ category.subcategories.length }} -->
        <!-- {{
          category.subcategories.length === 1
            ? 'subcategory'
            : 'subcategories'
        }} -->
      </p>

      <p
        v-else
        class="mt-1 text-xs text-zinc-500 sm:text-sm"
      >
        Explore products →
      </p>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>