<template>
  <Drawer
    v-model:visible="innerShowViewSaleDrawer"
    :header="sale.name"
    @after-hide="$emit('update-show-drawer')"
    position="right"
    class="flex h-full min-w-xl"
  >
    <template #default>
      <div class="flex flex-col gap-4 pt-8">
        <div class="flex justify-between">
          <p class="font-semibold">Nome:</p>
          <Skeleton v-if="isLoading" width="5rem" class="mb-2" />
          <p v-else>{{ sale.name }}</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Preço Total:</p>
          <Skeleton v-if="isLoading" width="5rem" class="mb-2" />
          <p v-else>{{ sale.totalPrice }}</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Qtde de Produtos:</p>
          <Skeleton v-if="isLoading" width="5rem" class="mb-2" />
          <p v-else>{{ productsQuantity }}</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Descrição:</p>
          <Skeleton v-if="isLoading" width="5rem" class="mb-2" />
          <p v-else>{{ sale.description }}</p>
        </div>
      </div>
      <Divider />
      <div v-if="productsQuantity > 0">
        <p class="font-semibold">Produtos</p>
        <DataTable :value="sale.products" tableStyle="min-width: 100% max-height: 80%">
          <Column field="productName" header="Nome" />
          <Column field="price" header="Preço">
            <template #body="slotProps"> R$ {{ slotProps.data.price }}</template>
          </Column>
          <Column field="quantity" header="Quantidade" />
        </DataTable>
      </div>
      <div v-else>
        <p>Nenhum produto associado a esta venda.</p>
      </div>
    </template>
    <template #footer>
      <Button
        label="Voltar"
        class="w-full border-current"
        severity="secondary"
        @click="innerShowViewSaleDrawer = false"
      />
    </template>
  </Drawer>
</template>

<script lang="ts">
import { getSale } from '@/services/sales/salesService'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update-show-drawer'],
  props: { showViewSaleDrawer: Boolean, saleId: String },
  data() {
    return {
      innerShowViewSaleDrawer: this.showViewSaleDrawer,
      sale: {
        name: '',
        description: '',
        totalPrice: 0,
        products: [] as any[],
      },
      isLoading: false,
    }
  },
  computed: {
    productsQuantity() {
      return this.sale.products.length
    },
  },
  watch: {
    showViewSaleDrawer(newValue) {
      this.innerShowViewSaleDrawer = newValue
      if (newValue) this.requestGetSale()
    },
  },
  methods: {
    async requestGetSale() {
      this.isLoading = true
      try {
        const sale = await getSale(this.saleId!)
        this.sale = {
          name: sale.name,
          description: sale.description,
          totalPrice: sale.totalPrice,
          products: sale.items,
        }
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
      this.isLoading = false
    },
  },
})
</script>
