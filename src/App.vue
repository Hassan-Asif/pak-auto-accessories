<template>
  <div class="min-h-screen bg-ink text-zinc-50">

    <!-- ================= GLOBAL LOADER ================= -->
    <Transition name="loader">

      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black"
      >

        <div class="flex flex-col items-center">

          <!-- Logo -->
          <div
            class="text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Neon<span class="text-zinc-500">LEDs</span>
          </div>

          <!-- Loading animation -->
          <div class="mt-6 flex items-center gap-2">

            <span
              class="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"
            ></span>

            <span
              class="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"
            ></span>

            <span
              class="h-2 w-2 animate-bounce rounded-full bg-white"
            ></span>

          </div>

          <p class="mt-4 text-xs font-medium tracking-[0.2em] text-zinc-500">
            LOADING
          </p>

        </div>

      </div>

    </Transition>


    <!-- ================= WEBSITE ================= -->

    <div v-show="!isLoading">

      <SiteHeader v-if="!isAdminRoute" />

      <RouterView />

      <SiteFooter v-if="!isAdminRoute" />

      <WhatsAppFloating v-if="!isAdminRoute" />

    </div>

  </div>
</template>


<script setup>

import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import WhatsAppFloating from './components/shared/WhatsAppFloating.vue'


const route = useRoute()
const router = useRouter()


// ================= ADMIN =================

const isAdminRoute = computed(() =>
  route.path.startsWith('/admin')
)


// ================= LOADING =================

const isLoading = ref(true)


// Wait until the initial route is ready
onMounted(async () => {

  try {

    // Make sure Vue Router has completed
    // the initial navigation
    await router.isReady()

  } catch (error) {

    console.error('Router loading error:', error)

  }

  // Small delay prevents the navbar/footer
  // from flashing before page content
  setTimeout(() => {

    isLoading.value = false

  }, 700)

})

</script>


<style>

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.4s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}

</style>