<template>
  <div class="min-h-screen bg-ink text-zinc-50">

    <!-- Loading Screen -->
    <Transition name="loader">

      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      >

        <div class="flex flex-col items-center">

          <!-- Logo -->
          <div
            class="text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Neon<span class="text-zinc-500">LEDs</span>
          </div>

          <!-- Spinner -->
          <div
            class="mt-6 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"
          ></div>

          <p
            class="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500"
          >
            Loading
          </p>

        </div>

      </div>

    </Transition>


    <!-- Header -->
    <SiteHeader v-if="!isAdminRoute" />


    <!-- Pages -->
    <RouterView />


    <!-- Footer -->
    <SiteFooter v-if="!isAdminRoute" />


    <!-- WhatsApp -->
    <WhatsAppFloating />

  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppFloating from './components/shared/WhatsAppFloating.vue'


const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})


const isLoading = ref(true)


onMounted(() => {

  // Give Vue a moment to render the initial page,
  // then remove the loading screen.

  setTimeout(() => {
    isLoading.value = false
  }, 700)

})
</script>


<style>
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.45s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>