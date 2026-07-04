import { defineStore } from 'pinia'
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, firebaseReady } from '../firebase/config'

export const useOrderStore = defineStore('orders', {
  state: () => ({ orders: [], loading: false }),
  actions: {
    async createOrder(order) {
      if (!firebaseReady) throw new Error('Firebase is not configured. Add Firebase keys before placing orders.')
      const payload = {
        ...order,
        status: 'Pending Confirmation',
        paymentInstruction: 'Payment will be requested only after vendor availability is confirmed.',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      const created = await addDoc(collection(db, 'orders'), payload)
      return created.id
    },
    async fetchOrders() {
      this.loading = true
      try {
        if (!firebaseReady) {
          this.orders = []
          return
        }
        const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
        this.orders = snap.docs.map((entry) => ({ id: entry.id, ...entry.data() }))
      } finally {
        this.loading = false
      }
    },
    async updateStatus(id, status) {
      if (!firebaseReady) throw new Error('Firebase is not configured.')
      await updateDoc(doc(db, 'orders', id), { status, updatedAt: serverTimestamp() })
      const order = this.orders.find((entry) => entry.id === id)
      if (order) order.status = status
    }
  }
})
