<template>
  <a
    :href="supportMessage('I need quick support for car accessories')"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp support"
    class="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
  >
    <!-- WhatsApp Logo -->
    <svg
      viewBox="0 0 32 32"
      class="h-8 w-8 sm:h-9 sm:w-9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="white"
        d="M16.02 2.67C8.66 2.67 2.67 8.65 2.67 16.01c0 2.35.61 4.64 1.77 6.66L2.57 29.3l6.78-1.78a13.32 13.32 0 0 0 6.67 1.8h.01c7.35 0 13.33-5.99 13.33-13.34 0-3.57-1.39-6.92-3.91-9.44a13.27 13.27 0 0 0-9.43-3.87Zm0 24.44h-.01a11.08 11.08 0 0 1-5.65-1.55l-.4-.24-4.02 1.05 1.07-3.92-.26-.4a11.08 11.08 0 0 1-1.7-5.89c0-6.12 4.98-11.1 11.1-11.1 2.97 0 5.76 1.16 7.86 3.26a11.04 11.04 0 0 1 3.25 7.87c0 6.12-4.98 11.1-11.1 11.1Z"
      />

      <path
        fill="white"
        d="M19.11 17.39c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.74.94-.91 1.13-.17.19-.33.22-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.03 2.77 1.17 2.96c.14.19 2.02 3.09 4.9 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33Z"
      />
    </svg>
  </a>
</template>

<script setup>
import { supportMessage } from '../../utils/whatsapp'
</script>