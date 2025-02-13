<script lang="ts">
export default {
  props: {
    title: String,
  },
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-100">
    <header class="bg-white p-4 shadow">
      <h1 class="text-xl font-semibold text-gray-800">{{ title }}</h1>
    </header>
    <main class="container mx-auto mt-6 flex-grow rounded-lg bg-white p-6 shadow-md">
      <slot></slot>
    </main>
  </div>
</template>
