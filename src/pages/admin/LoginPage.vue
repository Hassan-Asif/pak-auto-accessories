```vue
<template>
  <main
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10"
  >

    <!-- Background decoration -->

    <div
      class="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/5"
    ></div>

    <div
      class="pointer-events-none absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full border border-white/5"
    ></div>


    <!-- Login Card -->

    <div class="relative z-10 w-full max-w-md">

      <!-- Logo / Brand -->

      <div class="mb-8 text-center">

        <RouterLink
          to="/"
          class="inline-flex items-center text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Neon
          <span class="text-zinc-500">
            LEDs
          </span>
        </RouterLink>

        <div class="mt-3">

          <span
            class="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"
          >
            Admin Portal
          </span>

        </div>

      </div>


      <!-- Card -->

      <form
        class="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl sm:p-8"
        @submit.prevent="login"
      >

        <!-- Header -->

        <div>

          <h1
            class="text-2xl font-black tracking-tight text-white sm:text-3xl"
          >
            Welcome back.
          </h1>

          <p
            class="mt-2 text-sm leading-6 text-zinc-500"
          >
            Sign in to manage products, orders and your storefront.
          </p>

        </div>


        <!-- Email -->

        <div class="mt-7">

          <label class="label">
            Email Address
          </label>

          <input
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="admin@example.com"
            required
            class="field"
          />

        </div>


        <!-- Password -->

        <div class="mt-5">

          <div class="flex items-center justify-between">

            <label class="label mb-0">
              Password
            </label>

          </div>

          <div class="relative mt-2">

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
              class="field pr-20"
            />

            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-zinc-600 transition hover:text-white"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>

          </div>

        </div>


        <!-- Error -->

        <div
          v-if="error"
          class="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-3"
        >

          <p class="text-sm leading-5 text-red-400">
            {{ error }}
          </p>

        </div>


        <!-- Login Button -->

        <button
          type="submit"
          class="mt-7 flex w-full items-center justify-center rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="loading"
        >

          <span
            v-if="loading"
            class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-black"
          ></span>

          {{ loading ? 'Signing in...' : 'Sign In' }}

        </button>


        <!-- Security Note -->

        <div
          class="mt-6 flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >

          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm"
          >
            🔒
          </div>

          <div>

            <p class="text-xs font-bold text-zinc-300">
              Protected Area
            </p>

            <p class="mt-1 text-[11px] leading-5 text-zinc-600">
              This dashboard is restricted to authorized NeonLEDs
              administrators.
            </p>

          </div>

        </div>

      </form>


      <!-- Back to Store -->

      <div class="mt-6 text-center">

        <RouterLink
          to="/"
          class="text-sm font-semibold text-zinc-600 transition hover:text-white"
        >
          ← Back to Store
        </RouterLink>

      </div>

    </div>

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
const showPassword = ref(false)

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()


async function login() {

  error.value = ''
  loading.value = true

  try {

    await auth.login(
      email.value.trim(),
      password.value
    )

    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/admin'

    router.push(redirect)

  } catch (err) {

    console.error(
      'Admin login failed:',
      err
    )

    error.value =
      err?.message ||
      'Unable to sign in. Please check your email and password.'

  } finally {

    loading.value = false

  }

}
</script>
```
