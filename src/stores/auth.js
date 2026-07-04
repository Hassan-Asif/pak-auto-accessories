import { defineStore } from 'pinia'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, firebaseReady } from '../firebase/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, admin: null, loading: true }),
  actions: {
    listen() {
      if (!firebaseReady) {
        this.loading = false
        return
      }
      onAuthStateChanged(auth, async (user) => {
        this.user = user
        this.admin = null
        if (user) {
          const snap = await getDoc(doc(db, 'admins', user.uid))
          this.admin = snap.exists() ? snap.data() : null
        }
        this.loading = false
      })
    },
    async login(email, password) {
      if (!firebaseReady) throw new Error('Firebase is not configured. Add your Vite Firebase environment variables first.')
      await signInWithEmailAndPassword(auth, email, password)
    },
    async logout() {
      if (!firebaseReady) return
      await signOut(auth)
      this.user = null
      this.admin = null
    }
  }
})
