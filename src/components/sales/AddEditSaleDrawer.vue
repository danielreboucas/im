<template>
  <Drawer
    v-model:visible="innerShowAddSaleDrawer"
    @after-hide="$emit('update-show-drawer')"
    :header="!isEditing ? 'Criação de uma Venda' : 'Edição de uma Venda'"
    position="right"
    class="flex h-full min-w-xl"
  >
    <template #default>
      <div class="flex flex-col">
        <p>Insira as informações da Venda à ser {{ !isEditing ? 'criada' : 'editada' }}.</p>

        <div class="flex flex-col gap-4 pt-8">
          <FloatLabel variant="on">
            <label for="name" class="block text-sm font-medium">Nome</label>
            <InputText id="name" v-model="sale.name" class="mt-1 w-full" />
          </FloatLabel>

          <FloatLabel variant="on">
            <label for="description" class="block text-sm font-medium">Descrição</label>
            <Textarea id="description" v-model="sale.description" class="mt-1 w-full" autoResize />
          </FloatLabel>
          <!-- <FloatLabel v-if="isEditing" variant="on">
            <label for="totalPrice" class="block text-sm font-medium">Preço Total</label>
            <InputText
              type="number"
              id="totalPrice"
              v-model="sale.totalPrice"
              class="w-full"
              :min="0"
            />
          </FloatLabel> -->
        </div>

        <p>Insira ou remova produtos</p>

        <!-- <Button
          label="Adicionar produto"
          size="small"
          icon="pi pi-plus"
          severity="secondary"
          variant="outlined"
          class="self-end"
        /> -->
        <DataTable :value="sale.items" tableStyle="min-width: 100% max-height: 80%">
          <Column field="productName" header="Nome" />
          <Column field="price" header="Preço">
            <template #body="slotProps"> R$ {{ slotProps.data.price }}</template>
          </Column>
          <Column field="quantity" header="Quantidade" />
        </DataTable>
      </div>
    </template>
    <template #footer>
      <Button
        :label="!isEditing ? 'Criar' : 'Editar'"
        class="w-full"
        @click="!isEditing ? requestCreateSale() : requestEditSale()"
      />
    </template>
  </Drawer>
</template>

<script lang="ts">
import type { Product } from '@/interfaces/IProduct'
import type { SaleItem } from '@/interfaces/ISale'
import { getAllProducts } from '@/services/products/productsService'
import { createSale, editSale } from '@/services/sales/salesService'
import { formatSortOrder } from '@/utils/formatSort'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update-show-drawer', 'update-sales-list'],
  props: { showAddSaleDrawer: Boolean, isEditing: Boolean, saleToEdit: Object },
  data() {
    return {
      innerShowAddSaleDrawer: this.showAddSaleDrawer,
      sale: {
        name: '',
        description: '',
        items: [] as SaleItem[],
      },
      products: [] as Product[],
    }
  },
  watch: {
    showAddSaleDrawer(newValue) {
      this.innerShowAddSaleDrawer = newValue
    },
    saleToEdit(newValue) {
      this.sale = {
        name: this.isEditing ? newValue?.name : '',
        description: this.isEditing ? newValue?.description : '',
        items: this.isEditing ? newValue?.items : [],
      }
    },
  },
  methods: {
    async requestCreateSale() {
      try {
        await createSale({
          name: this.sale.name,
          description: this.sale.description,
          items: this.sale.items,
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso!',
          life: 3000,
        })
        this.sale = {
          name: '',
          description: '',
          items: [],
        }
        this.$emit('update-sales-list')
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
    async requestEditSale() {
      try {
        await editSale(this.saleToEdit?.id, {
          name: this.sale.name,
          description: this.sale.description,
        })
        this.$toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto editado com sucesso!',
          life: 3000,
        })
        this.sale = {
          name: '',
          description: '',
          items: [],
        }
        this.$emit('update-sales-list')
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
    async requestGetAllProducts(): Promise<void> {
      try {
        const response = await getAllProducts(0, 0)
        this.products = response.data
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
