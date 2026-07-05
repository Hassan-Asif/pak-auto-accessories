<template>
  <RouterLink :to="`/products?category=${encodeURIComponent(category.name)}`" class="group relative block overflow-hidden rounded-lg border border-zinc-800">
    <img :src="category.image" :alt="category.name" loading="lazy" class="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-105" />
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
    <div class="absolute bottom-0 p-5">
      <h3 class="text-xl font-black">{{ category.name }}</h3>
      <p class="mt-1 text-sm text-zinc-300"></p>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({ category: { type: Object, required: true } })
</script>
