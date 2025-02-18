<template>
  <PageContainer title="Produtos" :items="items">
    <div class="flex w-72 flex-col gap-3">
      <InputText type="text" placeholder="Email" />
      <InputText type="password" placeholder="Senha" />
      <span class="flex gap-1 text-xs">
        Não possui uma conta?
        <p class="cursor-pointer hover:underline">Registre-se!</p>
      </span>
    </div>
  </PageContainer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [{ label: 'Produtos', route: '/products' }],
    }
  },
}
</script>
