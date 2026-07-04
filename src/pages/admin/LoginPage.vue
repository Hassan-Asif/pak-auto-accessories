<template>
  <main class="grid min-h-screen place-items-center bg-ink px-4">
    <form class="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950 p-6" @submit.prevent="login">
      <h1 class="text-3xl font-black">Admin Login</h1>
      <p class="mt-2 text-sm text-zinc-400">Protected dashboard for product and order operations.</p>
      <div class="mt-6"><label class="label">Email</label><input v-model="email" type="email" required class="field" /></div>
      <div class="mt-4"><label class="label">Password</label><input v-model="password" type="password" required class="field" /></div>
      <p v-if="error" class="mt-4 text-sm text-red-300">{{ error }}</p>
      <button class="btn-primary mt-6 w-full" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

async function login() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push(route.query.redirect || '/admin')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
