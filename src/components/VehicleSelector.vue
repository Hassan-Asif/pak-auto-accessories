<template>
 <div
  class="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 p-4 sm:p-6 shadow-2xl backdrop-blur-md"
>
  <!-- Header -->
  <div class="mb-5 sm:mb-6">
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl"
      >
        🚗
      </div>

      <div>
        <h2 class="text-lg sm:text-xl font-bold text-white">
          Select Your Vehicle
        </h2>

        <p class="mt-0.5 text-xs sm:text-sm text-zinc-300">
          Find accessories that fit your car
        </p>
      </div>
    </div>
  </div>

  <!-- Selectors -->
  <div class="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">

    <!-- Make -->
    <div class="relative">
      <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
        Make
      </label>

      <select
        v-model="selectedMake"
        class="w-full appearance-none rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus:border-white/40 focus:bg-white/15"
        @change="loadModels"
      >
        <option value="" class="text-black">
          Select Make
        </option>

        <option
          v-for="make in vehicleStore.makes"
          :key="make"
          :value="make"
          class="text-black"
        >
          {{ make }}
        </option>
      </select>

      <span class="pointer-events-none absolute right-4 bottom-4 text-zinc-400">
        ▾
      </span>
    </div>

    <!-- Model -->
    <div class="relative">
      <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
        Model
      </label>

      <select
        v-model="selectedModel"
        class="w-full appearance-none rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus:border-white/40 focus:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!selectedMake"
        @change="loadYears(selectedModel)"
      >
        <option value="" class="text-black">
          Select Model
        </option>

        <option
          v-for="model in vehicleStore.models"
          :key="model.id"
          :value="model.name"
          class="text-black"
        >
          {{ model.name }}
        </option>
      </select>

      <span class="pointer-events-none absolute right-4 bottom-4 text-zinc-400">
        ▾
      </span>
    </div>

    <!-- Generation -->
    <div class="relative">
      <label class="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-300">
        Year / Generation
      </label>

      <select
        v-model="selectedGeneration"
        class="w-full appearance-none rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition hover:bg-white/15 focus:border-white/40 focus:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!selectedModel"
      >
        <option value="" class="text-black">
          Select Year
        </option>

        <option
          v-for="generation in vehicleStore.years"
          :key="generation.id"
          :value="generation.id"
          class="text-black"
        >
          {{ generation.displayName }}
        </option>
      </select>

      <span class="pointer-events-none absolute right-4 bottom-4 text-zinc-400">
        ▾
      </span>
    </div>

    <!-- Search Button -->
    <div class="flex flex-col">
      <label class="mb-1.5 hidden text-xs font-semibold uppercase tracking-wide text-zinc-300 md:block">
        &nbsp;
      </label>

      <button
        type="button"
        class="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black shadow-lg transition hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!selectedMake || !selectedModel || !selectedGeneration"
        @click="searchParts"
      >
        <span>Find Accessories</span>
        <span class="text-lg">→</span>
      </button>
    </div>

  </div>

  <!-- Mobile hint -->
  <p class="mt-4 text-center text-xs text-zinc-400 sm:hidden">
    Select your vehicle to see compatible accessories
  </p>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVehicleStore } from '../stores/vehicles'

const router = useRouter()
const vehicleStore = useVehicleStore()

const selectedMake = ref('')
const selectedModel = ref('')
const selectedGeneration = ref('')

onMounted(async () => {
  await vehicleStore.loadMakes()
})

async function loadModels() {
  await vehicleStore.loadModels(selectedMake.value)
}

async function loadYears(model) {
  await vehicleStore.loadYears(model)
}

function searchParts() {
  if (!selectedGeneration.value) {
    alert('Please select your vehicle.')
    return
  }

  localStorage.setItem(
    'selectedVehicle',
    selectedGeneration.value
  )

  router.push({
    path: '/products',
    query: {
      vehicle: selectedGeneration.value
    }
  })
}
</script>