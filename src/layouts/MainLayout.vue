<template>
  <TheSidebar :links="sidebarLinks" />
  <div class="h-screen flex-1 p-4">
    <router-view />
  </div>
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  components: { TheSidebar },
  props: {
    title: String,
  },
  data() {
    return {
      sidebarLinks: [
        { path: '/dashboard', name: 'Home', icon: 'pi pi-home' },
        { path: '/products', name: 'Produtos', icon: 'pi pi-box' },
        { path: '/sales', name: 'Vendas', icon: 'pi pi-dollar' },
        { path: '/orders', name: 'Compras', icon: 'pi pi-credit-card' },
      ],
    }
  },
}
</script>
