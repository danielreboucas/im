<template>
  <Drawer
    v-model:visible="innerShowAddProductDrawer"
    @after-hide="$emit('update-show-drawer')"
    :header="!isEditing ? 'Criação de produto' : 'Edição de produto'"
    position="right"
    class="flex h-full min-w-xl"
  >
    <template #default>
      <p>Insira as informações do produto à ser {{ !isEditing ? 'criado' : 'editado' }}.</p>

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
    <template #footer>
      <Button
        :label="!isEditing ? 'Criar' : 'Editar'"
        class="w-full"
        @click="!isEditing ? requestCreateProduct() : requestEditProduct()"
      />
    </template>
  </Drawer>
</template>

<script lang="ts">
import { createProduct, editProduct } from '@/services/products/productsService'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update-show-drawer', 'update-products-list'],
  props: { showAddProductDrawer: Boolean, isEditing: Boolean, productToEdit: Object },
  data() {
    return {
      innerShowAddProductDrawer: this.showAddProductDrawer,
      product: {
        name: this.productToEdit?.name || '',
        description: this.productToEdit?.description || '',
        quantity: this.productToEdit?.quantity || '',
      },
    }
  },
  watch: {
    showAddProductDrawer(newValue) {
      this.innerShowAddProductDrawer = newValue
    },
    productToEdit(newValue) {
      console.log(this.productToEdit)
      this.product = {
        name: newValue?.name || '',
        description: newValue?.description || '',
        quantity: newValue?.quantity || '',
      }
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
        this.product = {
          name: '',
          description: '',
          quantity: '',
        }
        this.$emit('update-products-list', this.product)
        this.$emit('update-show-drawer')
      } catch (error: any) {
        error.messages.map((msg: string) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: msg,
            life: 3000,
          })
        })
      }
    },
    async requestEditProduct() {
      try {
        await editProduct(this.productToEdit?.id, {
          name: this.product.name,
          description: this.product.description,
          quantity: Number(this.product.quantity),
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto editado com sucesso!',
          life: 3000,
        })
        this.product = {
          name: '',
          description: '',
          quantity: '',
        }
        this.$emit('update-products-list', this.product)
        this.$emit('update-show-drawer')
      } catch (error: any) {
        error.messages.map((msg: string) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: msg,
            life: 3000,
          })
        })
      }
    },
  },
})
</script>
