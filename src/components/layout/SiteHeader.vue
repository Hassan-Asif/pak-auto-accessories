<template>
  <div
    :class="[
      'w-full transition-all duration-300',
      isHomePage
        ? 'absolute inset-x-0 top-0 z-50'
        : 'relative z-50'
    ]"
  >
    <!-- NAVBAR -->
    <nav
      :class="[
        'w-full border-b transition-all duration-300',
        isTransparent
          ? 'border-white/10 bg-transparent'
          : 'border-zinc-200 bg-white'
      ]"
    >
      <div
        class="container-page flex min-h-[72px] items-center justify-between gap-6"
      >

        <!-- LOGO -->
        <RouterLink
          to="/"
          :class="[
            'shrink-0 text-2xl font-black tracking-tight transition-colors',
            isTransparent
              ? 'text-white'
              : 'text-zinc-900'
          ]"
        >
          Neon<span
            :class="isTransparent ? 'text-white/60' : 'text-zinc-400'"
          >
            LEDs
          </span>
        </RouterLink>


        <!-- DESKTOP NAVIGATION -->
        <div class="hidden items-center gap-7 lg:flex">

          <RouterLink
            to="/"
            :class="navLinkClass"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/products"
            :class="navLinkClass"
          >
            Products
          </RouterLink>

          <RouterLink
            to="/contact"
            :class="navLinkClass"
          >
            Contact Us
          </RouterLink>

        </div>


        <!-- DESKTOP SEARCH -->
        <div class="hidden min-w-0 flex-1 lg:block lg:max-w-sm xl:max-w-md">

          <input
            v-model="search"
            @keyup.enter="goToSearch"
            type="text"
            placeholder="Search products..."
            :class="[
              'w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all',
              isTransparent
                ? 'border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:border-white focus:bg-white/15'
                : 'border-zinc-300 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500 focus:border-black focus:bg-white'
            ]"
          />

        </div>


        <!-- DESKTOP RIGHT SIDE -->
        <div class="hidden items-center gap-3 lg:flex">

          <!-- Selected Vehicle -->
          <!-- <div
            v-if="selectedVehicle"
            :class="[
              'max-w-[190px] truncate rounded-xl border px-3 py-2 text-sm transition',
              isTransparent
                ? 'border-green-300/50 bg-green-400/10 text-green-100'
                : 'border-green-300 bg-green-50 text-green-700'
            ]"
          >
            🚗 {{ selectedVehicle.displayName }}
          </div> -->


          <!-- CART -->
          <RouterLink
            to="/cart"
            :class="[
              'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition',
              isTransparent
                ? 'border-white/30 bg-white/10 hover:bg-white/20'
                : 'border-zinc-300 bg-white hover:bg-zinc-100'
            ]"
            aria-label="Shopping cart"
          >

            <span class="text-lg">
              🛒
            </span>

            <span
              v-if="cart.count"
              class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white"
            >
              {{ cart.count }}
            </span>

          </RouterLink>

        </div>


        <!-- MOBILE MENU BUTTON -->
        <button
          type="button"
          class="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl transition lg:hidden"
          :class="
            isTransparent
              ? 'hover:bg-white/10'
              : 'hover:bg-zinc-100'
          "
          @click="open = !open"
          aria-label="Toggle menu"
          :aria-expanded="open"
        >

          <span
            :class="[
              'h-0.5 w-6 transition-all duration-300',
              isTransparent ? 'bg-white' : 'bg-black',
              open ? 'translate-y-2 rotate-45' : ''
            ]"
          ></span>

          <span
            :class="[
              'h-0.5 w-6 transition-all duration-300',
              isTransparent ? 'bg-white' : 'bg-black',
              open ? 'opacity-0' : 'opacity-100'
            ]"
          ></span>

          <span
            :class="[
              'h-0.5 w-6 transition-all duration-300',
              isTransparent ? 'bg-white' : 'bg-black',
              open ? '-translate-y-2 -rotate-45' : ''
            ]"
          ></span>

        </button>

      </div>
    </nav>


    <!-- MOBILE MENU -->
    <div
      v-if="open"
      :class="[
        'border-b shadow-lg lg:hidden',
        isTransparent
          ? 'border-white/10 bg-black/90 backdrop-blur-xl'
          : 'border-zinc-200 bg-white'
      ]"
    >

      <div class="container-page py-5">

        <!-- MOBILE SEARCH -->
        <input
          v-model="search"
          @keyup.enter="goToSearch"
          type="text"
          placeholder="Search products..."
          :class="[
            'mb-5 w-full rounded-xl border px-4 py-3 text-sm outline-none',
            isTransparent
              ? 'border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white'
              : 'border-zinc-300 bg-zinc-50 text-zinc-900 focus:border-black'
          ]"
        />


        <!-- SELECTED VEHICLE -->
        <div
          v-if="selectedVehicle"
          :class="[
            'mb-5 rounded-xl border px-4 py-3 text-sm',
            isTransparent
              ? 'border-green-300/30 bg-green-400/10 text-green-100'
              : 'border-green-300 bg-green-50 text-green-700'
          ]"
        >
          🚗 {{ selectedVehicle.displayName }}
        </div>


        <!-- MOBILE LINKS -->
        <div class="flex flex-col gap-2">

          <RouterLink
            to="/"
            @click="closeMenu"
            :class="mobileLinkClass"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/products"
            @click="closeMenu"
            :class="mobileLinkClass"
          >
            Products
          </RouterLink>

          <RouterLink
            to="/categories"
            @click="closeMenu"
            :class="mobileLinkClass"
          >
            Categories
          </RouterLink>

          <RouterLink
            to="/cart"
            @click="closeMenu"
            :class="mobileLinkClass"
          >
            <span>Cart</span>

            <span
              v-if="cart.count"
              class="rounded-full bg-black px-2 py-0.5 text-xs font-bold text-white"
            >
              {{ cart.count }}
            </span>
          </RouterLink>

        </div>


        <!-- MOBILE SHOP BUTTON -->
        <RouterLink
          to="/products"
          @click="closeMenu"
          class="mt-5 block rounded-xl bg-black py-3.5 text-center font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
        >
          Shop Now
        </RouterLink>

      </div>

    </div>

  </div>
</template>


<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const open = ref(false)
const search = ref('')

const selectedVehicle = ref(null)


/*
|--------------------------------------------------------------------------
| HOME PAGE
|--------------------------------------------------------------------------
*/

const isHomePage = computed(() => {
  return route.path === '/'
})


/*
|--------------------------------------------------------------------------
| TRANSPARENT NAVBAR
|--------------------------------------------------------------------------
|
| Homepage = transparent
| All other pages = white
|
| When the mobile menu is open, we give it a dark background
| so everything remains readable.
|
*/

const isTransparent = computed(() => {
  return isHomePage.value && !open.value
})


/*
|--------------------------------------------------------------------------
| DESKTOP NAV LINK STYLING
|--------------------------------------------------------------------------
*/

const navLinkClass = computed(() => {
  return [
    'font-medium transition-colors',
    isTransparent.value
      ? 'text-white/90 hover:text-white'
      : 'text-zinc-700 hover:text-black'
  ]
})


/*
|--------------------------------------------------------------------------
| MOBILE LINK STYLING
|--------------------------------------------------------------------------
*/

const mobileLinkClass = computed(() => {
  return [
    'flex items-center justify-between rounded-xl px-4 py-3 font-medium transition',
    isTransparent.value
      ? 'text-white hover:bg-white/10'
      : 'text-zinc-900 hover:bg-zinc-100'
  ]
})


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

function goToSearch() {
  const query = search.value.trim()

  if (!query) return

  router.push({
    path: '/products',
    query: {
      search: query
    }
  })

  closeMenu()
}


/*
|--------------------------------------------------------------------------
| MOBILE MENU
|--------------------------------------------------------------------------
*/

function closeMenu() {
  open.value = false
}


/*
|--------------------------------------------------------------------------
| LOAD SELECTED VEHICLE
|--------------------------------------------------------------------------
*/

function loadSelectedVehicle() {
  try {
    const stored = localStorage.getItem('selectedVehicle')

    if (!stored) {
      selectedVehicle.value = null
      return
    }

    try {
      selectedVehicle.value = JSON.parse(stored)
    } catch {
      selectedVehicle.value = {
        displayName: stored
      }
    }
  } catch {
    selectedVehicle.value = null
  }
}


/*
|--------------------------------------------------------------------------
| UPDATE WHEN VEHICLE CHANGES
|--------------------------------------------------------------------------
*/

function handleStorageChange(event) {
  if (event.key === 'selectedVehicle') {
    loadSelectedVehicle()
  }
}


onMounted(() => {
  loadSelectedVehicle()

  window.addEventListener('storage', handleStorageChange)
})


onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>