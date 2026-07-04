import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('pakauto_cart') || '[]')
  }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  actions: {
    persist() {
      localStorage.setItem('pakauto_cart', JSON.stringify(this.items))
    },
    add(product, quantity = 1) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) existing.quantity += quantity
      else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: Number(product.sellingPrice || product.price),
          image: product.images?.[0],
          availabilityStatus: product.availabilityStatus,
          quantity
        })
      }
      this.persist()
    },
    updateQuantity(id, quantity) {
      const item = this.items.find((entry) => entry.id === id)
      if (item) item.quantity = Math.max(1, Number(quantity))
      this.persist()
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id)
      this.persist()
    },
    clear() {
      this.items = []
      this.persist()
    }
  }
})
