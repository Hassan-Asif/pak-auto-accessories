<template>
  <AdminShell>
    <section class="p-6">

      <!-- Header -->
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-black">
            Products
          </h1>

          <p class="mt-1 text-sm text-zinc-400">
            Manage your products, pricing and compatible vehicles.
          </p>
        </div>

        <button
          class="btn-primary"
          @click="startNew"
        >
          + Add Product
        </button>
      </div>

      <!-- Product Form -->
      <div
        v-if="editing"
        class="mt-8 rounded-xl border border-zinc-800 bg-ink p-6"
      >

        <h2 class="text-2xl font-black">
          {{ form.id ? 'Edit Product' : 'Add Product' }}
        </h2>

        <form
          class="mt-6 space-y-6"
          @submit.prevent="save"
        >

          <!-- Basic Information -->
          <div class="grid gap-4 md:grid-cols-3">

            <div>
              <label class="label">
                Product Name
              </label>

              <input
                v-model="form.name"
                class="field"
                required
              >
            </div>

            <div>
              <label class="label">
                Category
              </label>

              <select
                v-model="form.category"
                class="field"
              >
                <option
                  v-for="category in products.categories"
                  :key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">
                Availability
              </label>

              <select
                v-model="form.availabilityStatus"
                class="field"
              >
                <option
                  v-for="status in availabilityStatuses"
                  :key="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>

          </div>

          <!-- Compatible Vehicles -->
          <div class="rounded-lg border border-zinc-800 p-5">

            <h3 class="text-lg font-bold">
              Compatible Vehicles
            </h3>

            <p class="mt-1 text-sm text-zinc-500">
              Add every vehicle this product fits.
            </p>

            <div class="mt-5 grid gap-3 md:grid-cols-4">

              <select
                v-model="selectedMake"
                class="field"
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

              <select
                v-model="selectedModel"
                class="field"
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

              <select
                v-model="selectedYear"
                class="field"
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

              <button
                type="button"
                class="btn-primary"
                @click="addVehicle"
              >
                + Add Vehicle
              </button>

            </div>

            <div
              v-if="form.compatibleVehicles.length"
              class="mt-6 grid gap-3"
            >

              <div
                v-for="vehicle in form.compatibleVehicles"
                :key="vehicle.id"
                class="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
              >

                <div>
                  <p class="font-semibold">
                    {{ vehicle.displayName }}
                  </p>

                  <p class="text-xs text-zinc-500">
                    {{ vehicle.brand }} • {{ vehicle.model }}
                  </p>
                </div>

                <button
                  type="button"
                  class="text-red-400 hover:text-red-300"
                  @click="removeVehicle(vehicle.id)"
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

          <!-- Pricing -->
          <div class="grid gap-4 md:grid-cols-3">

            <div>
              <label class="label">
                Selling Price
              </label>

              <input
                v-model.number="form.sellingPrice"
                type="number"
                class="field"
              >
            </div>

            <div>
              <label class="label">
                Vendor Price
              </label>

              <input
                v-model.number="form.vendorPrice"
                type="number"
                class="field"
              >
            </div>

            <div>
              <label class="label">
                Profit
              </label>

              <input
                :value="profit"
                disabled
                class="field"
              >
            </div>

          </div>

          <!-- Vendor -->
          <div class="grid gap-4 md:grid-cols-3">

            <div>
              <label class="label">
                Vendor Name
              </label>

              <input
                v-model="form.vendorName"
                class="field"
              >
            </div>

            <div>
              <label class="label">
                Vendor Contact
              </label>

              <input
                v-model="form.vendorContact"
                class="field"
              >
            </div>

            <div>
              <label class="label">
                Estimated Delivery
              </label>

              <input
                v-model="form.estimatedDelivery"
                class="field"
              >
            </div>

          </div>

          <!-- Description -->
          <div>

            <label class="label">
              Description
            </label>

            <textarea
              v-model="form.description"
              class="field min-h-36"
            />

          </div>

          <!-- Images -->
          <div class="grid gap-5 md:grid-cols-2">

            <div>

              <label class="label">
                Upload Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                class="field"
                @change="files = $event.target.files"
              >

            </div>

            <div>

              <label class="label">
                Image URLs
              </label>

              <textarea
                v-model="imageText"
                class="field min-h-28"
              />

            </div>

          </div>

          <!-- Flags -->
          <div class="flex flex-wrap gap-6">

            <label class="flex items-center gap-2">
              <input
                v-model="form.isFeatured"
                type="checkbox"
              >

              Featured
            </label>

            <label class="flex items-center gap-2">
              <input
                v-model="form.isActive"
                type="checkbox"
              >

              Active
            </label>

          </div>

          <!-- Buttons -->
          <div class="flex gap-3">

            <button
              class="btn-primary"
              :disabled="saving"
            >
              {{ saving ? 'Saving...' : 'Save Product' }}
            </button>

            <button
              type="button"
              class="btn-secondary"
              @click="editing = false"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

      <!-- Product Table -->
      <div class="mt-8 overflow-hidden rounded-xl border border-zinc-800">

        <table class="w-full">

          <thead class="bg-zinc-900">

            <tr>

              <th class="p-4 text-left">
                Product
              </th>

              <th class="text-left">
                Price
              </th>

              <th class="text-left">
                Vehicles
              </th>

              <th class="text-left">
                Status
              </th>

              <th class="text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

  <tr
    v-for="product in products.products"
    :key="product.id"
    class="border-t border-zinc-800"
  >

    <td class="p-4">
      <div class="font-semibold">
        {{ product.name }}
      </div>

      <div class="text-xs text-zinc-500">
        {{ product.category }}
      </div>
    </td>

    <td>
      Rs {{ Number(product.sellingPrice || 0).toLocaleString() }}
    </td>

    <td>
      {{ product.compatibleVehicles?.length || 0 }}
    </td>

    <td>
      {{ product.availabilityStatus }}
    </td>

    <td>
      <button
        class="text-blue-400 hover:underline"
        @click="edit(product)"
      >
        Edit
      </button>

      <button
        class="ml-4 text-red-400 hover:underline"
        @click="remove(product.id)"
      >
        Delete
      </button>
    </td>

  </tr>

</tbody>

        </table>

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
const selectedMake = ref('')
const selectedModel = ref('')
const selectedYear = ref('')
const products = useProductStore()
const editing = ref(false)
const saving = ref(false)
const files = ref(null)
const imageText = ref('')
const form = reactive(defaultProduct())
const profit = computed(() => Number(form.sellingPrice || 0) - Number(form.vendorPrice || 0))


function defaultProduct() {
  return {
    id: '',
    name: '',
    category: 'LED Lights',

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
function assign(data) {
  Object.assign(form, defaultProduct(), data)

  form.compatibleVehicles = [...(data.compatibleVehicles || [])]

  imageText.value = (form.images || []).join('\n')

  selectedMake.value = ''
  selectedModel.value = ''
  selectedYear.value = ''
}
function startNew() {
  assign(defaultProduct())
  files.value = null
  editing.value = true
}
function edit(product) {
  assign(product)

  files.value = null

  editing.value = true
}
async function save() {
  saving.value = true
  try {
    form.images = imageText.value.split('\n').map((value) => value.trim()).filter(Boolean)
    form.profit =
  Number(form.sellingPrice || 0) -
  Number(form.vendorPrice || 0)
    const id = await products.saveProduct(form)
    if (files.value?.length) {
      const urls = await products.uploadProductImages(id, files.value)
      await products.saveProduct({ ...form, id, images: [...form.images, ...urls] })
    }
    await products.fetchAdminProducts()

editing.value = false
assign(defaultProduct())
files.value = null
imageText.value = ''
  } finally {
    saving.value = false
  }
}
async function remove(id) {
  if (confirm('Delete this product?')) {
    await products.deleteProduct(id)
    await products.fetchAdminProducts()
  }
}
async function loadModels() {
  await vehicleStore.loadModels(selectedMake.value)
}

async function loadYears() {
  await vehicleStore.loadYears(selectedModel.value)
}

function addVehicle() {
  if (!selectedMake.value || !selectedModel.value || !selectedYear.value) {
    return
  }

  const vehicle = vehicleStore.years.find(
    v => v.id === selectedYear.value
  )

  if (!vehicle) return

  const exists = form.compatibleVehicles.some(
    v => v.id === vehicle.id
  )

  if (exists) return

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

function removeVehicle(id) {
  form.compatibleVehicles =
    form.compatibleVehicles.filter(v => v.id !== id)
}

onMounted(async () => {
  await products.fetchAdminProducts()
  await vehicleStore.loadMakes()
})
</script>
