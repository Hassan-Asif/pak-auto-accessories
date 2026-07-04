<template>
  <div class="min-h-screen bg-ink text-zinc-50">
    <SiteHeader v-if="!isAdminRoute" />
    <RouterView />
    <SiteFooter v-if="!isAdminRoute" />
    <WhatsAppFloating />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppFloating from './components/shared/WhatsAppFloating.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>
