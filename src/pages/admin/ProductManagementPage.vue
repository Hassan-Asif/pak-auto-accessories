<template>
  <AdminShell>
    <section class="p-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><h1 class="text-3xl font-black">Products</h1><p class="mt-1 text-sm text-zinc-400">Manage storefront and admin-only vendor fields.</p></div>
        <button class="btn-primary" @click="startNew">Add Product</button>
      </div>

      <div v-if="editing" class="mt-6 rounded-lg border border-zinc-800 bg-ink p-5">
        <h2 class="text-xl font-black">{{ form.id ? 'Edit Product' : 'Add Product' }}</h2>
        <form class="mt-5 grid gap-4" @submit.prevent="save">
          <div class="grid gap-4 md:grid-cols-3">
            <div><label class="label">Name</label><input v-model="form.name" required class="field" /></div>
            <div><label class="label">Category</label><select v-model="form.category" required class="field"><option v-for="category in products.categories" :key="category.id">{{ category.name }}</option></select></div>
            <div><label class="label">Availability</label><select v-model="form.availabilityStatus" required class="field"><option v-for="status in availabilityStatuses" :key="status">{{ status }}</option></select></div>
            <div><label class="label">Car Brand</label><input v-model="form.carBrand" class="field" /></div>
            <div><label class="label">Car Model</label><input v-model="form.carModel" class="field" /></div>
            <div><label class="label">Estimated Delivery</label><input v-model="form.estimatedDelivery" class="field" /></div>
            <div><label class="label">Selling Price</label><input v-model.number="form.sellingPrice" type="number" min="0" class="field" /></div>
            <div><label class="label">Vendor Price</label><input v-model.number="form.vendorPrice" type="number" min="0" class="field" /></div>
            <div><label class="label">Profit</label><input :value="profit" disabled class="field" /></div>
            <div><label class="label">Vendor Name</label><input v-model="form.vendorName" class="field" /></div>
            <div><label class="label">Vendor Contact</label><input v-model="form.vendorContact" class="field" /></div>
            <div><label class="label">Images</label><input type="file" accept="image/png,image/jpeg,image/webp" multiple class="field" @change="files = $event.target.files" /></div>
          </div>
          <div><label class="label">Description</label><textarea v-model="form.description" class="field min-h-28"></textarea></div>
          <div><label class="label">Image URLs</label><textarea v-model="imageText" class="field min-h-24" placeholder="One image URL per line"></textarea></div>
          <div class="flex flex-wrap gap-5">
            <label class="flex items-center gap-2 text-sm"><input v-model="form.isFeatured" type="checkbox" /> Featured</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="form.isActive" type="checkbox" /> Active</label>
          </div>
          <div class="flex gap-3"><button class="btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save Product' }}</button><button type="button" class="btn-secondary" @click="editing = false">Cancel</button></div>
        </form>
      </div>

      <div class="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
        <table class="w-full min-w-[900px] text-left text-sm">
          <thead class="bg-zinc-900 text-zinc-400"><tr><th class="p-3">Product</th><th class="p-3">Status</th><th class="p-3">Selling</th><th class="p-3">Vendor</th><th class="p-3">Profit</th><th class="p-3">Actions</th></tr></thead>
          <tbody>
            <tr v-for="product in products.products" :key="product.id" class="border-t border-zinc-800">
              <td class="p-3 font-bold">{{ product.name }}<span class="block text-xs font-normal text-zinc-500">{{ product.category }}</span></td>
              <td class="p-3">{{ product.availabilityStatus }}</td>
              <td class="p-3">Rs {{ Number(product.sellingPrice || 0).toLocaleString() }}</td>
              <td class="p-3">{{ product.vendorName || '-' }}<span class="block text-xs text-zinc-500">{{ product.vendorContact }}</span></td>
              <td class="p-3">Rs {{ Number(product.profit || 0).toLocaleString() }}</td>
              <td class="p-3"><button class="text-red-200" @click="edit(product)">Edit</button><button class="ml-4 text-zinc-400" @click="remove(product.id)">Delete</button></td>
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

const products = useProductStore()
const editing = ref(false)
const saving = ref(false)
const files = ref(null)
const imageText = ref('')
const form = reactive(defaultProduct())
const profit = computed(() => Number(form.sellingPrice || 0) - Number(form.vendorPrice || 0))

function defaultProduct() {
  return { id: '', name: '', category: 'LED Lights', carBrand: '', carModel: '', description: '', sellingPrice: 0, vendorPrice: 0, estimatedDelivery: 'Confirm before payment', availabilityStatus: 'Check Availability', images: [], isFeatured: false, isActive: true, vendorName: '', vendorContact: '' }
}
function assign(data) {
  Object.assign(form, defaultProduct(), data)
  imageText.value = (form.images || []).join('\n')
}
function startNew() {
  assign({})
  editing.value = true
}
function edit(product) {
  assign(product)
  editing.value = true
}
async function save() {
  saving.value = true
  try {
    form.images = imageText.value.split('\n').map((value) => value.trim()).filter(Boolean)
    const id = await products.saveProduct(form)
    if (files.value?.length) {
      const urls = await products.uploadProductImages(id, files.value)
      await products.saveProduct({ ...form, id, images: [...form.images, ...urls] })
    }
    await products.fetchAdminProducts()
    editing.value = false
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
onMounted(() => products.fetchAdminProducts())
</script>
