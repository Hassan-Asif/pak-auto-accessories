<template>
  <main
    v-if="product"
    class="bg-white"
  >

    <section class="container-page py-16">

      <div class="grid gap-14 lg:grid-cols-2">

        <!-- LEFT -->

        <div>

          <div
            class="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
          >
            <img
              :src="selectedImage"
              :alt="product.name"
              class="aspect-square w-full object-cover"
            />
          </div>

          <div class="mt-5 grid grid-cols-4 gap-3">

            <button
              v-for="image in product.images"
              :key="image"
              @click="selectedImage=image"
              class="overflow-hidden rounded-xl border border-zinc-200 transition hover:border-black"
            >
              <img
                :src="image"
                :alt="product.name"
                class="aspect-square w-full object-cover"
              >
            </button>

          </div>

        </div>

        <!-- RIGHT -->

        <section class="lg:sticky lg:top-28 lg:self-start">

          <span
            class="inline-flex rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-700"
          >
            {{ product.category }}
          </span>

          <h1
            class="mt-5 text-5xl font-black text-zinc-900"
          >
            {{ product.name }}
          </h1>

          <p
            class="mt-6 text-5xl font-black text-black"
          >
            Rs {{ Number(product.sellingPrice || product.price).toLocaleString() }}
          </p>

          <p
            class="mt-6 leading-8 text-zinc-600"
          >
            {{ product.description }}
          </p>

          <!-- Compatibility -->

          <!-- <div
            v-if="product.compatibleVehicles?.length"
            class="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6"
          >

            <div class="flex items-center gap-3">

              <span class="text-2xl">
                🚗
              </span>

              <div>

                <h3 class="font-bold text-green-800">
                  Compatible Vehicles
                </h3>

                <p class="text-sm text-green-700">
                  Verified fitment
                </p>

              </div>

            </div>

            <div class="mt-5 flex flex-wrap gap-2">

              <span
                v-for="vehicle in product.compatibleVehicles"
                :key="vehicle.id"
                class="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
              >
                {{ vehicle.displayName }}
              </span>

            </div>

          </div> -->

          <!-- Delivery -->

          <div
            class="mt-6 rounded-2xl border border-zinc-200 p-5"
          >

            <div class="flex items-center gap-3">

              <span>
                📦
              </span>

              <div>

                <p class="font-semibold">
                  Estimated Delivery
                </p>

                <p class="text-sm text-zinc-500">
                  {{ product.estimatedDelivery }}
                </p>

              </div>

            </div>

          </div>

          <!-- Buttons -->

          <div
            class="mt-8 flex flex-col gap-4"
          >

            <button
              class="rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-zinc-800"
              @click="addToCart"
            >
              Add to Cart
            </button>

            <!-- <a
              :href="productInquiry(product)"
              target="_blank"
              rel="noopener"
              class="rounded-2xl border border-black py-4 text-center text-lg font-semibold transition hover:bg-zinc-100 text-black"
            >
              WhatsApp Inquiry
            </a> -->

          </div>

          <!-- Trust -->

          <!-- <div
            class="mt-8 grid gap-4 sm:grid-cols-3"
          > -->

            <!-- <div class="rounded-xl bg-zinc-100 p-4 text-center">

              <div class="text-2xl">
                🚚
              </div>

              <p class="mt-2 text-sm font-semibold">
                Nationwide Delivery
              </p>

            </div>

            <div class="rounded-xl bg-zinc-100 p-4 text-center">

              <div class="text-2xl">
                ✔
              </div>

              <p class="mt-2 text-sm font-semibold">
                Verified Fitment
              </p>

            </div>

            <div class="rounded-xl bg-zinc-100 p-4 text-center">

              <div class="text-2xl">
                💬
              </div>

              <p class="mt-2 text-sm font-semibold">
                WhatsApp Support
              </p>

            </div>

          </div> -->

        </section>

      </div>

    </section>

    <!-- Related Products -->

    <section
      v-if="relatedProducts.length"
      class="bg-zinc-50 py-20"
    >

      <div class="container-page">

        <div class="mb-10 flex items-end justify-between">

          <div>

            <h2 class="text-4xl font-black text-zinc-900">
              You May Also Like
            </h2>

            <p class="mt-3 text-zinc-500">
              Products compatible with similar vehicles.
            </p>

          </div>

          <RouterLink
            to="/products"
            class="hidden rounded-xl border border-black px-6 py-3 font-semibold hover:bg-black hover:text-white sm:block"
          >
            View All
          </RouterLink>

        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

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
