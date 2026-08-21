<template>
  <AdminShell>
    <section class="w-full min-w-0 space-y-6 overflow-x-hidden sm:space-y-8">

      <!-- ================= HEADER ================= -->
      <div
        class="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div class="min-w-0">
          <p
            class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs"
          >
            Store Management
          </p>

          <h1
            class="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl"
          >
            Products
          </h1>

          <p class="mt-2 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
            Manage products, categories, pricing, availability, images and
            vehicle compatibility.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98] sm:w-auto"
          @click="startNew"
        >
          <span class="mr-2 text-lg">+</span>
          Add Product
        </button>
      </div>

      <!-- ================= PRODUCT FORM ================= -->
      <div
        v-if="editing"
        class="min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl sm:rounded-3xl"
      >

        <!-- Form Header -->
        <div class="border-b border-zinc-800 px-4 py-4 sm:px-7 sm:py-5">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0">
              <p
                class="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-[10px]"
              >
                Product Editor
              </p>

              <h2 class="mt-1 truncate text-lg font-black text-white sm:text-2xl">
                {{ form.id ? 'Edit Product' : 'Add Product' }}
              </h2>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-xl text-zinc-500 transition hover:border-zinc-600 hover:text-white"
              @click="editing = false"
            >
              ×
            </button>
          </div>
        </div>

        <form
          class="space-y-6 p-4 sm:space-y-8 sm:p-7"
          @submit.prevent="save"
        >

          <!-- ================= BASIC INFORMATION ================= -->
          <div>
            <div class="mb-4 sm:mb-5">
              <h3 class="text-sm font-bold text-white sm:text-base">
                Basic Information
              </h3>

              <p class="mt-1 text-[11px] leading-5 text-zinc-600 sm:text-xs">
                Product details shown to customers.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">

              <!-- Product Name -->
              <div class="min-w-0 lg:col-span-2">
                <label class="label">
                  Product Name
                </label>

                <input
                  v-model="form.name"
                  class="field w-full"
                  placeholder="e.g. Premium Floor Mats"
                  required
                >
              </div>

              <!-- Category -->
              <div class="min-w-0">
                <label class="label">
                  Category
                </label>

                <select
                  v-model="form.category"
                  class="field w-full"
                  @change="handleCategoryChange"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option
                    v-for="category in products.categories"
                    :key="category.id"
                    :value="category.name"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <!-- Subcategory -->
              <div class="min-w-0">
                <label class="label">
                  Subcategory
                </label>

                <select
                  v-model="form.subcategory"
                  class="field w-full"
                  :disabled="!selectedCategoryObject?.subcategories?.length"
                >
                  <option value="">
                    {{
                      selectedCategoryObject?.subcategories?.length
                        ? 'Select Subcategory'
                        : 'No Subcategories'
                    }}
                  </option>

                  <option
                    v-for="subcategory in selectedCategoryObject?.subcategories || []"
                    :key="subcategory.id"
                    :value="subcategory.name"
                  >
                    {{ subcategory.name }}
                  </option>
                </select>
              </div>

              <!-- Availability -->
              <div class="min-w-0">
                <label class="label">
                  Availability
                </label>

                <select
                  v-model="form.availabilityStatus"
                  class="field w-full"
                >
                  <option
                    v-for="status in availabilityStatuses"
                    :key="status"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- ================= VEHICLE COMPATIBILITY ================= -->
          <div
            class="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6"
          >
            <div>
              <h3 class="text-sm font-bold text-white sm:text-base">
                Compatible Vehicles
              </h3>

              <p class="mt-1 text-[11px] leading-5 text-zinc-600 sm:text-xs">
                Select every vehicle generation this product fits.
              </p>
            </div>

            <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <!-- Make -->
              <select
                v-model="selectedMake"
                class="field w-full"
                @change="loadModels"
              >
                <option value="">
                  Select Make
                </option>

                <option
                  v-for="make in vehicleStore.makes"
                  :key="make"
                  :value="make"
                >
                  {{ make }}
                </option>
              </select>

              <!-- Model -->
              <select
                v-model="selectedModel"
                class="field w-full"
                :disabled="!selectedMake"
                @change="loadYears"
              >
                <option value="">
                  Select Model
                </option>

                <option
                  v-for="model in vehicleStore.models"
                  :key="model.id"
                  :value="model.name"
                >
                  {{ model.name }}
                </option>
              </select>

              <!-- Generation -->
              <select
                v-model="selectedYear"
                class="field w-full"
                :disabled="!selectedModel"
              >
                <option value="">
                  Select Generation
                </option>

                <option
                  v-for="generation in vehicleStore.years"
                  :key="generation.id"
                  :value="generation.id"
                >
                  {{ generation.displayName }}
                </option>
              </select>

              <!-- Add -->
              <button
                type="button"
                class="min-h-12 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="
                  !selectedMake ||
                  !selectedModel ||
                  !selectedYear
                "
                @click="addVehicle"
              >
                + Add Vehicle
              </button>
            </div>

            <!-- Selected Vehicles -->
            <div
              v-if="form.compatibleVehicles.length"
              class="mt-5 space-y-2"
            >
              <div
                v-for="vehicle in form.compatibleVehicles"
                :key="vehicle.id"
                class="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
              >
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold text-white">
                    {{ vehicle.displayName }}
                  </p>

                  <p class="mt-1 truncate text-[11px] text-zinc-600 sm:text-xs">
                    {{ vehicle.brand }} · {{ vehicle.model }}
                  </p>
                </div>

                <button
                  type="button"
                  class="shrink-0 rounded-lg px-2 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300 sm:px-3"
                  @click="removeVehicle(vehicle.id)"
                >
                  Remove
                </button>
              </div>
            </div>

            <div
              v-else
              class="mt-5 rounded-xl border border-dashed border-zinc-800 px-4 py-6 text-center"
            >
              <p class="text-xs text-zinc-600 sm:text-sm">
                No compatible vehicles added yet.
              </p>
            </div>
          </div>

          <!-- ================= PRICING ================= -->
          <div>
            <div class="mb-4 sm:mb-5">
              <h3 class="text-sm font-bold text-white sm:text-base">
                Pricing
              </h3>

              <p class="mt-1 text-[11px] leading-5 text-zinc-600 sm:text-xs">
                Set your selling and vendor costs.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

              <!-- Selling Price -->
              <div class="min-w-0">
                <label class="label">
                  Selling Price
                </label>

                <div class="relative">
                  <span
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-600"
                  >
                    Rs
                  </span>

                  <input
                    v-model.number="form.sellingPrice"
                    type="number"
                    min="0"
                    class="field w-full pl-11"
                    placeholder="0"
                  >
                </div>
              </div>

              <!-- Vendor Price -->
              <div class="min-w-0">
                <label class="label">
                  Vendor Price
                </label>

                <div class="relative">
                  <span
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-600"
                  >
                    Rs
                  </span>

                  <input
                    v-model.number="form.vendorPrice"
                    type="number"
                    min="0"
                    class="field w-full pl-11"
                    placeholder="0"
                  >
                </div>
              </div>

              <!-- Profit -->
              <div class="min-w-0">
                <label class="label">
                  Profit
                </label>

                <div
                  class="flex min-h-[46px] items-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4"
                >
                  <span class="text-sm font-black text-emerald-400">
                    Rs {{ profit.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= VENDOR ================= -->
          <div>
            <div class="mb-4 sm:mb-5">
              <h3 class="text-sm font-bold text-white sm:text-base">
                Vendor & Delivery
              </h3>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">

              <div class="min-w-0">
                <label class="label">
                  Vendor Name
                </label>

                <input
                  v-model="form.vendorName"
                  class="field w-full"
                  placeholder="Vendor / Supplier"
                >
              </div>

              <div class="min-w-0">
                <label class="label">
                  Vendor Contact
                </label>

                <input
                  v-model="form.vendorContact"
                  class="field w-full"
                  placeholder="Phone / WhatsApp"
                >
              </div>

              <div class="min-w-0 md:col-span-2 lg:col-span-1">
                <label class="label">
                  Estimated Delivery
                </label>

                <input
                  v-model="form.estimatedDelivery"
                  class="field w-full"
                  placeholder="Confirm before payment"
                >
              </div>
            </div>
          </div>

          <!-- ================= DESCRIPTION ================= -->
          <div>
            <label class="label">
              Description
            </label>

            <textarea
              v-model="form.description"
              class="field min-h-32 w-full resize-y sm:min-h-36"
              placeholder="Describe the product, features and important fitment information..."
            />
          </div>

          <!-- ================= IMAGES ================= -->
          <div>
            <div class="mb-4 sm:mb-5">
              <h3 class="text-sm font-bold text-white sm:text-base">
                Product Images
              </h3>

              <p class="mt-1 text-[11px] leading-5 text-zinc-600 sm:text-xs">
                You can upload images or paste external image URLs.
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">

              <!-- Upload -->
              <div
                class="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <label class="label">
                  Upload Images
                </label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  class="field w-full cursor-pointer"
                  @change="files = $event.target.files"
                >

                <p class="mt-2 text-[10px] leading-4 text-zinc-700 sm:text-[11px]">
                  Multiple images supported.
                </p>
              </div>

              <!-- URLs -->
              <div
                class="min-w-0 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
              >
                <label class="label">
                  Image URLs
                </label>

                <textarea
                  v-model="imageText"
                  class="field min-h-28 w-full resize-y"
                  placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
                />

                <p class="mt-2 text-[10px] leading-4 text-zinc-700 sm:text-[11px]">
                  Add one image URL per line.
                </p>
              </div>
            </div>
          </div>

          <!-- ================= FLAGS ================= -->
          <div
            class="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:gap-8"
          >
            <label class="flex min-h-10 cursor-pointer items-center gap-3">
              <input
                v-model="form.isFeatured"
                type="checkbox"
                class="h-4 w-4 rounded border-zinc-700"
              >

              <span class="text-sm font-semibold text-zinc-300">
                Featured Product
              </span>
            </label>

            <label class="flex min-h-10 cursor-pointer items-center gap-3">
              <input
                v-model="form.isActive"
                type="checkbox"
                class="h-4 w-4 rounded border-zinc-700"
              >

              <span class="text-sm font-semibold text-zinc-300">
                Active Product
              </span>
            </label>
          </div>

          <!-- ================= FORM BUTTONS ================= -->
          <div
            class="flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-end sm:pt-6"
          >
            <button
              type="button"
              class="min-h-12 rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:w-auto"
              @click="editing = false"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="min-h-12 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              :disabled="saving"
            >
              {{ saving ? 'Saving Product...' : 'Save Product' }}
            </button>
          </div>
        </form>
      </div>

      <!-- ================= PRODUCT LIST ================= -->
      <div class="min-w-0">

        <div
          class="mb-4 flex items-end justify-between gap-4"
        >
          <div class="min-w-0">
            <p
              class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-xs"
            >
              Inventory
            </p>

            <h2 class="mt-1 text-lg font-black text-white sm:text-xl">
              Your Products
            </h2>
          </div>

          <span
            class="shrink-0 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-500"
          >
            {{ products.products.length }}
          </span>
        </div>

        <!-- ================= DESKTOP TABLE ================= -->
        <div
          class="hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 md:block"
        >
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px]">
              <thead class="border-b border-zinc-800 bg-zinc-950">
                <tr>
                  <th class="p-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Product
                  </th>

                  <th class="p-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Category
                  </th>

                  <th class="p-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Price
                  </th>

                  <th class="p-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Vehicles
                  </th>

                  <th class="p-4 text-left text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Status
                  </th>

                  <th class="p-4 text-right text-xs font-bold uppercase tracking-wider text-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="product in products.products"
                  :key="product.id"
                  class="border-t border-zinc-800 transition hover:bg-zinc-950"
                >
                  <!-- Product -->
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="product.images?.[0]"
                        :src="product.images[0]"
                        :alt="product.name"
                        class="h-12 w-12 rounded-lg object-cover"
                      >

                      <div
                        v-else
                        class="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-xs text-zinc-600"
                      >
                        IMG
                      </div>

                      <div class="min-w-0">
                        <p
                          class="max-w-[220px] truncate font-bold text-white"
                        >
                          {{ product.name }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <!-- Category -->
                  <td class="p-4">
                    <p class="text-sm font-semibold text-zinc-300">
                      {{ product.category }}
                    </p>

                    <p
                      v-if="product.subcategory"
                      class="mt-1 text-xs text-zinc-600"
                    >
                      {{ product.subcategory }}
                    </p>
                  </td>

                  <!-- Price -->
                  <td class="whitespace-nowrap p-4">
                    <span class="font-bold text-white">
                      Rs {{ Number(product.sellingPrice || 0).toLocaleString() }}
                    </span>
                  </td>

                  <!-- Vehicles -->
                  <td class="p-4">
                    <span
                      class="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-400"
                    >
                      {{ product.compatibleVehicles?.length || 0 }}
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="p-4">
                    <span
                      class="inline-flex max-w-[180px] rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-400"
                    >
                      {{ product.availabilityStatus }}
                    </span>
                  </td>

                  <!-- Actions -->
                  <td class="whitespace-nowrap p-4 text-right">
                    <button
                      type="button"
                      class="text-sm font-semibold text-zinc-300 transition hover:text-white"
                      @click="edit(product)"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="ml-4 text-sm font-semibold text-red-400 transition hover:text-red-300"
                      @click="remove(product.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                <tr v-if="!products.products.length">
                  <td
                    colspan="6"
                    class="p-12 text-center text-sm text-zinc-600"
                  >
                    No products found. Add your first product above.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ================= MOBILE PRODUCTS ================= -->
        <div class="grid gap-3 md:hidden">

          <div
            v-for="product in products.products"
            :key="product.id"
            class="min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
          >
            <!-- Product Header -->
            <div class="flex min-w-0 gap-3">

              <img
                v-if="product.images?.[0]"
                :src="product.images[0]"
                :alt="product.name"
                class="h-16 w-16 shrink-0 rounded-xl object-cover"
              >

              <div
                v-else
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-[10px] text-zinc-600"
              >
                IMG
              </div>

              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold text-white sm:text-base">
                  {{ product.name }}
                </p>

                <div class="mt-1 flex min-w-0 flex-wrap gap-1.5">
                  <span
                    class="max-w-full truncate rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] font-semibold text-zinc-400"
                  >
                    {{ product.category }}
                  </span>

                  <span
                    v-if="product.subcategory"
                    class="max-w-full truncate rounded-full bg-zinc-700 px-2 py-0.5 text-[9px] font-semibold text-zinc-400"
                  >
                    {{ product.subcategory }}
                  </span>
                </div>

                <p class="mt-2 text-sm font-black text-white">
                  Rs {{ Number(product.sellingPrice || 0).toLocaleString() }}
                </p>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-4 grid grid-cols-2 gap-2">

              <div class="rounded-lg bg-zinc-950 p-3">
                <p class="text-[9px] uppercase tracking-wider text-zinc-700">
                  Vehicles
                </p>

                <p class="mt-1 text-sm font-bold text-zinc-300">
                  {{ product.compatibleVehicles?.length || 0 }}
                </p>
              </div>

              <div class="min-w-0 rounded-lg bg-zinc-950 p-3">
                <p class="text-[9px] uppercase tracking-wider text-zinc-700">
                  Status
                </p>

                <p class="mt-1 truncate text-xs font-semibold text-zinc-400">
                  {{ product.availabilityStatus }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                class="min-h-11 rounded-xl bg-white py-2.5 text-sm font-bold text-black transition hover:bg-zinc-200"
                @click="edit(product)"
              >
                Edit
              </button>

              <button
                type="button"
                class="min-h-11 rounded-xl border border-red-500/20 bg-red-500/5 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                @click="remove(product.id)"
              >
                Delete
              </button>
            </div>
          </div>

          <div
            v-if="!products.products.length"
            class="rounded-2xl border border-dashed border-zinc-800 p-10 text-center"
          >
            <p class="text-sm text-zinc-600">
              No products found.
            </p>
          </div>
        </div>
      </div>
    </section>
  </AdminShell>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import AdminShell from './AdminShell.vue'
import { availabilityStatuses } from '../../data/constants'
import { useProductStore } from '../../stores/products'
import { useVehicleStore } from '../../stores/vehicles'

const vehicleStore = useVehicleStore()
const products = useProductStore()

const selectedMake = ref('')
const selectedModel = ref('')
const selectedYear = ref('')

const editing = ref(false)
const saving = ref(false)

const files = ref(null)
const imageText = ref('')

/*
|--------------------------------------------------------------------------
| SUBCATEGORIES
|--------------------------------------------------------------------------
*/

const subcategoryMap = {
  'LED Lights': [
    {
      id: 'headlights',
      name: 'Headlights'
    },
    {
      id: 'fog-lights',
      name: 'Fog Lights'
    },
    {
      id: 'indicators',
      name: 'Indicators'
    },
    {
      id: 'interior-led',
      name: 'Interior LEDs'
    }
  ],

  'Exterior Accessories': [
    {
      id: 'top-covers',
      name: 'Top Covers'
    },
    {
      id: 'air-press',
      name: 'Air Press'
    },
    {
      id: 'side-mirrors',
      name: 'Side Mirror Covers'
    }
  ],

  'Interior Accessories': [
    {
      id: 'dashboard',
      name: 'Dashboard'
    },
    {
      id: 'floor-mats',
      name: 'Floor Mats'
    },
    {
      id: 'sun-shades',
      name: 'Sun Shades'
    },
    {
      id: 'android',
      name: 'Android / Multimedia'
    },
    {
      id: 'steering',
      name: 'Steering Accessories'
    },
    {
      id: 'interior-lighting',
      name: 'Interior Lighting'
    }
  ],

  'Car Care': [
    {
      id: 'car-wash',
      name: 'Car Wash'
    },
    {
      id: 'polish-wax',
      name: 'Polish & Wax'
    },
    {
      id: 'dashboard-care',
      name: 'Dashboard Care'
    },
    {
      id: 'interior-cleaning',
      name: 'Interior Cleaning'
    },
    {
      id: 'microfiber',
      name: 'Microfiber & Towels'
    },
    {
      id: 'key-cover',
      name: 'Key Cover'
    }
  ],

  'Security & Utility': [
    {
      id: 'car-security',
      name: 'Car Security'
    },
    {
      id: 'dash-cams',
      name: 'Dash Cams'
    },
    {
      id: 'parking-sensors',
      name: 'Parking Sensors'
    },
    {
      id: 'phone-holders',
      name: 'Phone Holders'
    },
    {
      id: 'chargers',
      name: 'Chargers'
    },
    {
      id: 'emergency',
      name: 'Emergency & Utility'
    }
  ]
}

/*
|--------------------------------------------------------------------------
| DEFAULT PRODUCT
|--------------------------------------------------------------------------
*/

function defaultProduct() {
  return {
    id: '',
    name: '',
    category: 'LED Lights',
    subcategory: '',
    compatibleVehicles: [],
    description: '',
    sellingPrice: 0,
    vendorPrice: 0,
    estimatedDelivery: 'Confirm before payment',
    availabilityStatus: 'Check Availability',
    images: [],
    isFeatured: false,
    isActive: true,
    vendorName: '',
    vendorContact: ''
  }
}

const form = reactive(defaultProduct())

/*
|--------------------------------------------------------------------------
| SELECTED CATEGORY
|--------------------------------------------------------------------------
*/

const selectedCategoryObject = computed(() => {
  const category = products.categories.find(
    category => category.name === form.category
  )

  if (!category) {
    return null
  }

  return {
    ...category,
    subcategories:
      category.subcategories?.length
        ? category.subcategories
        : subcategoryMap[category.name] || []
  }
})

/*
|--------------------------------------------------------------------------
| PROFIT
|--------------------------------------------------------------------------
*/

const profit = computed(() => {
  return (
    Number(form.sellingPrice || 0) -
    Number(form.vendorPrice || 0)
  )
})

/*
|--------------------------------------------------------------------------
| CATEGORY CHANGE
|--------------------------------------------------------------------------
*/

function handleCategoryChange() {
  form.subcategory = ''
}

/*
|--------------------------------------------------------------------------
| ASSIGN PRODUCT
|--------------------------------------------------------------------------
*/

function assign(data) {
  Object.assign(
    form,
    defaultProduct(),
    data
  )

  form.compatibleVehicles = [
    ...(data.compatibleVehicles || [])
  ]

  form.subcategory = data.subcategory || ''

  imageText.value =
    (form.images || []).join('\n')

  selectedMake.value = ''
  selectedModel.value = ''
  selectedYear.value = ''

  vehicleStore.models = []
  vehicleStore.years = []
}

/*
|--------------------------------------------------------------------------
| START NEW
|--------------------------------------------------------------------------
*/

function startNew() {
  assign(defaultProduct())

  files.value = null
  imageText.value = ''

  editing.value = true

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/*
|--------------------------------------------------------------------------
| EDIT
|--------------------------------------------------------------------------
*/

function edit(product) {
  assign(product)

  files.value = null

  editing.value = true

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/*
|--------------------------------------------------------------------------
| SAVE
|--------------------------------------------------------------------------
*/

async function save() {
  if (!form.name.trim()) {
    alert('Please enter a product name.')
    return
  }

  if (!form.category) {
    alert('Please select a category.')
    return
  }

  saving.value = true

  try {
    form.images = imageText.value
      .split('\n')
      .map(value => value.trim())
      .filter(Boolean)

    form.profit =
      Number(form.sellingPrice || 0) -
      Number(form.vendorPrice || 0)

    const id = await products.saveProduct({
      ...form,
      category: form.category,
      subcategory: form.subcategory || ''
    })

    /*
     * Upload selected local images.
     */
    if (files.value?.length) {
      const urls =
        await products.uploadProductImages(
          id,
          files.value
        )

      await products.saveProduct({
        ...form,
        id,
        images: [
          ...form.images,
          ...urls
        ]
      })
    }

    await products.fetchAdminProducts()

    editing.value = false

    assign(defaultProduct())

    files.value = null
    imageText.value = ''

  } catch (error) {
    console.error('Failed to save product:', error)

    alert(
      error?.message ||
      'Failed to save product. Please try again.'
    )
  } finally {
    saving.value = false
  }
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

async function remove(id) {
  if (!confirm('Delete this product?')) {
    return
  }

  try {
    await products.deleteProduct(id)
    await products.fetchAdminProducts()
  } catch (error) {
    console.error('Failed to delete product:', error)

    alert(
      error?.message ||
      'Failed to delete product.'
    )
  }
}

/*
|--------------------------------------------------------------------------
| VEHICLE SELECTORS
|--------------------------------------------------------------------------
*/

async function loadModels() {
  selectedModel.value = ''
  selectedYear.value = ''

  vehicleStore.years = []

  await vehicleStore.loadModels(
    selectedMake.value
  )
}

async function loadYears() {
  selectedYear.value = ''

  await vehicleStore.loadYears(
    selectedModel.value
  )
}

/*
|--------------------------------------------------------------------------
| ADD VEHICLE
|--------------------------------------------------------------------------
*/

function addVehicle() {
  if (
    !selectedMake.value ||
    !selectedModel.value ||
    !selectedYear.value
  ) {
    return
  }

  const vehicle =
    vehicleStore.years.find(
      vehicle =>
        vehicle.id === selectedYear.value
    )

  if (!vehicle) {
    return
  }

  const exists =
    form.compatibleVehicles.some(
      vehicle =>
        vehicle.id === selectedYear.value
    )

  if (exists) {
    return
  }

  form.compatibleVehicles.push({
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    displayName: vehicle.displayName
  })

  selectedMake.value = ''
  selectedModel.value = ''
  selectedYear.value = ''

  vehicleStore.models = []
  vehicleStore.years = []
}

/*
|--------------------------------------------------------------------------
| REMOVE VEHICLE
|--------------------------------------------------------------------------
*/

function removeVehicle(id) {
  form.compatibleVehicles =
    form.compatibleVehicles.filter(
      vehicle =>
        vehicle.id !== id
    )
}

/*
|--------------------------------------------------------------------------
| LOAD
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  try {
    await products.fetchAdminProducts()
    await vehicleStore.loadMakes()
  } catch (error) {
    console.error(
      'Failed to load admin products:',
      error
    )
  }
})
</script>