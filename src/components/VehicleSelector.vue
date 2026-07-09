<template>
  <div class="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950/90 p-6 backdrop-blur">

    <h2 class="mb-5 text-xl font-bold text-white">
      Select Your Vehicle
    </h2>

    <div class="grid gap-4 md:grid-cols-4">

      <select
        v-model="selectedMake"
        class="field"
        @change="loadModels"
      >
        <option value="">Select Make</option>

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
        @change="loadYears(selectedModel)"
      >
        <option value="">Select Model</option>

        <option
          v-for="model in vehicleStore.models"
          :key="model.id"
          :value="model.name"
        >
          {{ model.name }}
        </option>
      </select>

      <select
        v-model="selectedGeneration"
        class="field"
        :disabled="!selectedModel"
      >
        <option value="">Select Generation</option>

        <option
          v-for="generation in vehicleStore.years"
          :key="generation.id"
          :value="generation.id"
        >
          {{ generation.displayName }}
        </option>
      </select>

      <button
        class="btn-primary"
        @click="searchParts"
      >
        Search Vehicle
      </button>

    </div>

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