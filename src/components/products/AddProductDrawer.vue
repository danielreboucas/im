<template>
  <Drawer
    v-model:visible="innerShowAddProductDrawer"
    @after-hide="$emit('update-show-drawer')"
    header="Criação de produto"
    position="right"
    class="flex h-full min-w-xl"
    c
  >
    <template #default>
      <p>Insira as informações do produto à ser criado.</p>

      <div class="flex flex-col gap-4 pt-8">
        <FloatLabel variant="on">
          <label for="name" class="block text-sm font-medium">Nome</label>
          <InputText id="name" v-model="product.name" class="mt-1 w-full" />
        </FloatLabel>

        <FloatLabel variant="on">
          <label for="description" class="block text-sm font-medium">Descrição</label>
          <Textarea id="description" v-model="product.description" class="mt-1 w-full" autoResize />
        </FloatLabel>

        <FloatLabel variant="on">
          <label for="quantity" class="block text-sm font-medium">Quantidade</label>
          <InputText
            type="number"
            id="quantity"
            v-model="product.quantity"
            class="w-full"
            :min="0"
          />
        </FloatLabel>
      </div>
    </template>
    <template #footer
      ><Button label="Criar Produto" class="w-full" @click="requestCreateProduct"
    /></template>
  </Drawer>
</template>

<script lang="ts">
import { createProduct } from '@/services/products/productsService'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update-show-drawer', 'update-products-list'],
  props: { showAddProductDrawer: Boolean },
  data() {
    return {
      innerShowAddProductDrawer: this.showAddProductDrawer,
      product: {
        name: '',
        description: '',
        quantity: '',
      },
    }
  },
  watch: {
    showAddProductDrawer(newValue) {
      this.innerShowAddProductDrawer = newValue
    },
  },
  methods: {
    async requestCreateProduct() {
      try {
        await createProduct({
          name: this.product.name,
          description: this.product.description,
          quantity: Number(this.product.quantity),
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso!',
          life: 3000,
        })
        this.$emit('update-products-list')
        this.$emit('update-show-drawer')
      } catch (error: any) {
        this.$toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
          life: 3000,
        })
      }
    },
  },
})
</script>
