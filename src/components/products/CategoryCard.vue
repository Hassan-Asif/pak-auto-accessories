<template>
  <RouterLink
    :to="`/products?category=${encodeURIComponent(category.name)}`"
    class="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
  >
    <!-- Image -->
    <img
      :src="category.image"
      :alt="category.name"
      loading="lazy"
      class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
    />

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

    <!-- Category Name -->
    <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5">
      <h3
        class="text-base sm:text-lg lg:text-xl font-bold text-white leading-tight"
      >
        {{ category.name }}
      </h3>
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