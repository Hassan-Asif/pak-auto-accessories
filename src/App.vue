<template>
  <div class="min-h-screen bg-white text-zinc-900">

    <!-- Header -->
    <SiteHeader v-if="!isAdminRoute" />

    <!-- Page -->
    <RouterView />

    <!-- Footer -->
    <SiteFooter v-if="!isAdminRoute" />

    <!-- WhatsApp -->
    <WhatsAppFloating v-if="!isAdminRoute" />

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppFloating from './components/shared/WhatsAppFloating.vue'

const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>