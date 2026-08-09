<template>
  <main
    v-if="product"
    class="bg-white"
  >

    <!-- PRODUCT SECTION -->
    <section class="container-page py-6 sm:py-10 lg:py-16">

      <div
        class="grid items-start gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20"
      >

        <!-- ================= LEFT: PRODUCT IMAGE ================= -->

        <div class="min-w-0">

          <!-- Main Image -->
          <div
            class="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm sm:rounded-3xl"
          >
            <img
              :src="selectedImage"
              :alt="product.name"
              class="aspect-square w-full object-contain p-4 sm:p-8 lg:p-10"
            />
          </div>

          <!-- Thumbnails -->
          <div
            v-if="product.images?.length > 1"
            class="mt-4 flex gap-2.5 overflow-x-auto pb-2 sm:mt-5 sm:gap-3"
          >

            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              @click="selectedImage = image"
              :class="[
                'h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-zinc-50 transition sm:h-20 sm:w-20',
                selectedImage === image
                  ? 'border-black'
                  : 'border-zinc-200 hover:border-zinc-500'
              ]"
            >
              <img
                :src="image"
                :alt="product.name"
                class="h-full w-full object-cover"
              />
            </button>

          </div>

        </div>


        <!-- ================= RIGHT: PRODUCT INFO ================= -->

        <section
          class="min-w-0 lg:sticky lg:top-28"
        >

          <!-- Category -->
          <span
            class="inline-flex rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] font-semibold text-zinc-700 sm:px-4 sm:py-2 sm:text-xs"
          >
            {{ product.category }}
          </span>


          <!-- Product Name -->
          <h1
            class="mt-4 max-w-2xl text-3xl font-black leading-tight text-zinc-900 sm:mt-5 sm:text-4xl lg:text-5xl"
          >
            {{ product.name }}
          </h1>


          <!-- Price -->
          <div
            class="mt-5 rounded-2xl bg-zinc-150 p-4 sm:mt-6 sm:p-5"
          >
            <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Price
            </p>

            <p
              class="mt-1 text-3xl font-black text-zinc-900 sm:text-4xl"
            >
              Rs {{ Number(product.sellingPrice || product.price || 0).toLocaleString() }}
            </p>
          </div>


          <!-- Description -->
          <div class="mt-6 sm:mt-7">

            <h2 class="text-sm font-bold uppercase tracking-wide text-zinc-900">
              Description
            </h2>

            <p
              class="mt-2 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8"
            >
              {{ product.description }}
            </p>

          </div>


          <!-- Delivery -->
          <!-- <div
            v-if="product.estimatedDelivery"
            class="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 sm:mt-7 sm:p-5"
          >

            <div class="flex items-center gap-3">

              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-lg"
              >
                📦
              </div>

              <div class="min-w-0">

                <p class="font-semibold text-zinc-900">
                  Estimated Delivery
                </p>

                <p class="mt-0.5 text-sm text-zinc-500">
                  {{ product.estimatedDelivery }}
                </p>

              </div>

            </div>

          </div> -->


          <!-- Add To Cart -->
          <div class="mt-6 sm:mt-8">

            <button
              type="button"
              class="w-full rounded-xl bg-black py-4 text-base font-bold text-white shadow-lg transition hover:bg-zinc-800 active:scale-[0.99] sm:rounded-2xl sm:py-5 sm:text-lg"
              @click="addToCart"
            >
              Add to Cart
            </button>

          </div>


          <!-- Trust Information -->
          <div
            class="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3"
          >

            <div
              class="rounded-xl bg-zinc-200 p-3 text-center sm:rounded-2xl sm:p-4"
            >
              <div class="text-lg sm:text-xl">
                🚚
              </div>

              <p class="mt-1 text-[10px] font-semibold text-zinc-700 sm:text-xs">
                Delivery In Karachi
              </p>
            </div>


            <div
              class="rounded-xl bg-zinc-200 p-3 text-center sm:rounded-2xl sm:p-4"
            >
              <div class="text-lg sm:text-xl color-black">
                ✔️
              </div>

              <p class="mt-1 text-[10px] font-semibold text-zinc-700 sm:text-xs">
                Quality Checked
              </p>
            </div>


            <div
              class="rounded-xl bg-zinc-200 p-3 text-center sm:rounded-2xl sm:p-4"
            >
              <div class="text-lg sm:text-xl">
                💬
              </div>

              <p class="mt-1 text-[10px] font-semibold text-zinc-700 sm:text-xs">
                Support
              </p>
            </div>

          </div>

        </section>

      </div>

    </section>


    <!-- ================= RELATED PRODUCTS ================= -->

    <section
      v-if="relatedProducts.length"
      class="bg-zinc-50 py-10 sm:py-14 lg:py-20"
    >

      <div class="container-page">

        <!-- Header -->
        <div
          class="mb-7 flex items-end justify-between gap-4 sm:mb-10"
        >

          <div class="min-w-0">

            <h2
              class="text-2xl font-black text-zinc-900 sm:text-3xl lg:text-4xl"
            >
              You May Also Like
            </h2>

            <p
              class="mt-1.5 text-xs text-zinc-500 sm:mt-2 sm:text-sm lg:text-base"
            >
              Products compatible with similar vehicles.
            </p>

          </div>


          <!-- View All -->
          <RouterLink
            to="/products"
            class="hidden shrink-0 rounded-xl border border-black bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:block"
          >
            View All
          </RouterLink>

        </div>


        <!-- Related Product Grid -->
        <div
          class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >

          <ProductCard
            v-for="item in relatedProducts"
            :key="item.id"
            :product="item"
          />

        </div>

      </div>

    </section>

  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/products'
import { productInquiry } from '../utils/whatsapp'
import ProductCard from '../components/products/ProductCard.vue'
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute()
const productStore = useProductStore()
const cart = useCartStore()
const product = ref(null)
const selectedImage = ref('')

function addToCart() {
  cart.add(product.value);

  toast.success(`${product.value.name} added to cart!`);
}

const relatedProducts = computed(() => {
  if (!product.value) return []

  const currentVehicles =
    product.value.compatibleVehicles?.map(v => v.id) || []

  return productStore.activeProducts
    .filter(item => {

      if (item.id === product.value.id) return false

      const sameVehicle =
        item.compatibleVehicles?.some(v =>
          currentVehicles.includes(v.id)
        )

      return sameVehicle

    })
    .slice(0, 4)
})

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }

  product.value = await productStore.fetchProduct(route.params.id)
  selectedImage.value = product.value?.images?.[0]
})
</script>
