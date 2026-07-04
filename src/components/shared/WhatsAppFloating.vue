<template>
  <a
    :href="supportMessage('I need quick support for car accessories in Pakistan')"
    target="_blank"
    rel="noopener"
    class="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-xl font-black text-white shadow-glow transition hover:scale-105"
    aria-label="WhatsApp support"
  >
    WA
  </a>
</template>

<script setup>
import { supportMessage } from '../../utils/whatsapp'
</script>
