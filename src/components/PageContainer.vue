<template>
  <div class="flex flex-col overflow-y-hidden bg-gray-100">
    <header class="bg-white p-4">
      <h1 class="text-3xl font-semibold text-gray-800">{{ title }}</h1>
      <Breadcrumb :home="{ icon: 'pi pi-home', route: '/dashboard' }" :model="items">
        <template #item="{ item, props }">
          <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="font-semibold">{{ item.label }}</span>
            </a>
          </RouterLink>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </header>
    <main class="rounded-lg bg-white p-4 text-gray-800">
      <slot class="w-full"></slot>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    items: Array<{ label: string; route: string }>,
  },
}
</script>
