<template>
  <span :class="classes" class="inline-flex rounded-full px-3 py-1 text-xs font-bold">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ label: { type: String, required: true } })

const classes = computed(() => {
  if (props.label === 'Out of Stock') return 'bg-zinc-800 text-zinc-400'
  if (props.label === 'Check Availability') return 'bg-amber-500/10 text-amber-300'
  if (props.label === 'Usually Dispatched in 2–3 Days') return 'bg-blue-500/10 text-blue-300'
  return 'bg-red-500/10 text-red-200'
})
</script>
