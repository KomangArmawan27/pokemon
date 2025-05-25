<template>
  <div class="flex justify-center mt-6 gap-1 text-sm flex-wrap">
    <button
      @click="$emit('change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded-l border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
    >
      Prev
    </button>

    <button
      v-for="page in pagesToShow"
      :key="page + '-button'"
      @click="typeof page === 'number' && $emit('change', page)"
      :disabled="typeof page === 'string'"
      :class="[
        'px-3 py-1 border border-gray-300',
        page === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100',
        typeof page === 'string' ? 'cursor-default' : ''
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="$emit('change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded-r border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

// Computed for smart pagination
const pagesToShow = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (current === 5) {
      pages.push(1, '...', 4, 5, 6, '...', total)
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return pages
})
</script>
