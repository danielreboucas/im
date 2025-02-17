<script lang="ts">
import Button from 'primevue/button'

export default {
  props: {
    links: Array<{ name: string; path: string; icon: string }>,
  },
  components: { Button },
  data() {
    return {
      isCollapsed: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
  },
}
</script>

<template>
  <aside
    :class="[
      'flex h-screen flex-col justify-between bg-gray-800 p-4 text-white transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <div>
      <div>
        <button
          :class="[
            'mb-4 w-full text-white focus:outline-none',
            { 'flex justify-end': !isCollapsed },
          ]"
        >
          <i
            @click="toggleSidebar"
            v-if="isCollapsed"
            class="pi pi-angle-double-right cursor-pointer"
          />
          <i @click="toggleSidebar" v-else class="pi pi-angle-double-left cursor-pointer" />
        </button>
      </div>

      <nav class="pt-8">
        <ul :class="['flex flex-col gap-4', { 'items-center': isCollapsed }]">
          <li v-for="(link, index) in links" :key="index" class="mb-2">
            <RouterLink
              :to="link.path"
              :class="[
                'flex items-center gap-2 rounded p-2 hover:bg-gray-600',
                { 'bg-gray-600': $route.path === link.path },
              ]"
            >
              <i :class="link.icon" class="p-2 text-white"></i>
              <span v-if="!isCollapsed" class="ml-2 text-white transition-all duration-300">{{
                link.name
              }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <footer class="flex items-center justify-between">
      <p v-if="!isCollapsed" class="pl-2">Daniel R</p>
      <Button
        variant="text"
        icon="pi pi-sign-out"
        class="!text-white hover:!border-gray-600 hover:!bg-gray-600"
      />
    </footer>
  </aside>
</template>
