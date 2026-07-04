import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage, firebaseReady } from '../firebase/config'
import { categories } from '../data/constants'

const fallbackProducts = [
  // {
  //   id: 'demo-led-headlights',
  //   name: 'H11 LED Headlight Pair',
  //   category: 'LED Lights',
  //   carBrand: 'Toyota',
  //   carModel: 'Corolla',
  //   description: 'High brightness white LED pair with focused beam pattern for Pakistani roads.',
  //   price: 8500,
  //   sellingPrice: 8500,
  //   estimatedDelivery: 'Usually dispatched in 2-3 days after confirmation',
  //   availabilityStatus: 'Available on Confirmation',
  //   images: ['https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80'],
  //   isFeatured: true,
  //   isActive: true
  // },
  // {
  //   id: 'demo-owner-kit',
  //   name: 'Premium Owner Kit Organizer',
  //   category: 'Owner Kits',
  //   carBrand: 'Honda',
  //   carModel: 'Civic',
  //   description: 'Document pouch, key cover, microfiber cloth, and compact emergency essentials.',
  //   price: 4200,
  //   sellingPrice: 4200,
  //   estimatedDelivery: 'Confirm before payment',
  //   availabilityStatus: 'Check Availability',
  //   images: ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80'],
  //   isFeatured: true,
  //   isActive: true
  // },
  // {
  //   id: 'demo-car-care',
  //   name: 'Interior Detail Care Pack',
  //   category: 'Car Care',
  //   carBrand: 'Universal',
  //   carModel: 'All Models',
  //   description: 'Dashboard cleaner, upholstery brush, glass cloth, and dressing applicator.',
  //   price: 5600,
  //   sellingPrice: 5600,
  //   estimatedDelivery: 'Usually dispatched in 2-3 days after confirmation',
  //   availabilityStatus: 'Usually Dispatched in 2–3 Days',
  //   images: ['https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80'],
  //   isFeatured: true,
  //   isActive: true
  // }
]

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    categories
  }),
  getters: {
    activeProducts: (state) => state.products.filter((product) => product.isActive !== false),
    featuredProducts: (state) => state.products.filter((product) => product.isFeatured && product.isActive !== false).slice(0, 6)
  },
  actions: {
    async fetchProducts(filters = {}) {
      this.loading = true
      this.error = null
      try {
        if (!firebaseReady) {
          this.products = fallbackProducts
          return
        }
        const constraints = [where('isActive', '==', true), orderBy('createdAt', 'desc')]
        if (filters.category) constraints.unshift(where('category', '==', filters.category))
        const snap = await getDocs(query(collection(db, 'products'), ...constraints, limit(60)))
        this.products = snap.docs.map((entry) => ({ id: entry.id, ...entry.data() }))
      } catch (error) {
        this.error = error.message
        this.products = fallbackProducts
      } finally {
        this.loading = false
      }
    },
    async fetchAdminProducts() {
      this.loading = true
      try {
        if (!firebaseReady) {
          this.products = fallbackProducts
          return
        }
        const snap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')))
        this.products = snap.docs.map((entry) => ({ id: entry.id, ...entry.data() }))
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id) {
      const cached = this.products.find((product) => product.id === id)
      if (cached) return cached
      if (id.startsWith('demo-')) return fallbackProducts.find((product) => product.id === id)
      if (!firebaseReady) return null
      const snap = await getDoc(doc(db, 'products', id))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    },
    async saveProduct(product) {
      if (!firebaseReady) throw new Error('Firebase is not configured.')
      const payload = {
        ...product,
        price: Number(product.sellingPrice || product.price || 0),
        sellingPrice: Number(product.sellingPrice || product.price || 0),
        vendorPrice: Number(product.vendorPrice || 0),
        profit: Number(product.sellingPrice || 0) - Number(product.vendorPrice || 0),
        updatedAt: serverTimestamp()
      }
      if (product.id) {
        await updateDoc(doc(db, 'products', product.id), payload)
        return product.id
      }
      const created = await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() })
      return created.id
    },
    async deleteProduct(id) {
      if (!firebaseReady) throw new Error('Firebase is not configured.')
      await deleteDoc(doc(db, 'products', id))
    },
    async uploadProductImages(productId, files) {
      if (!firebaseReady) throw new Error('Firebase is not configured.')
      const accepted = Array.from(files).filter((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) && file.size <= 5 * 1024 * 1024)
      const uploads = accepted.map(async (file) => {
        const storageRef = ref(storage, `products/${productId}/${Date.now()}-${file.name}`)
        await uploadBytes(storageRef, file, { contentType: file.type })
        return getDownloadURL(storageRef)
      })
      return Promise.all(uploads)
    }
  }
})
