<template>
  <div class="min-h-screen bg-ink text-zinc-50">

    <SiteHeader v-if="!isAdminRoute" />

    <RouterView />

    <SiteFooter v-if="!isAdminRoute" />

    <WhatsAppFloating />

  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppFloating from './components/shared/WhatsAppFloating.vue'


const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})


onMounted(() => {

  const loader = document.getElementById('initial-loader')

  if (!loader) return

  // Small delay gives Vue time to render the actual page
  requestAnimationFrame(() => {

    setTimeout(() => {

      loader.classList.add('hidden')

      setTimeout(() => {
        loader.remove()
      }, 500)

    }, 250)

  })

})
</script>