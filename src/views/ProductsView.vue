<template>
  <PageContainer title="Produtos" :items="items">
    <Button
      label="Adicionar produto"
      icon="pi pi-plus"
      @click="showAddEditProductDrawer((isEditing = false))"
    />
    <DataTable
      :value="products"
      tableStyle="min-width: 50rem"
      editMode="row"
      scrollable
      scrollHeight="400px"
      class="pt-8 shadow-md"
    >
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      <Column style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="slotProps">
          <div class="flex gap-4">
            <Button
              icon="pi pi-trash"
              severity="secondary"
              @click="confirmDeleteProduct(slotProps.data.id)"
            />
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              @click="showAddEditProductDrawer((isEditing = true), slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <AddEditProductDrawer
      :showAddProductDrawer="showAddProductDrawer"
      :isEditing="isEditing"
      :productToEdit="productToEdit"
      @update-show-drawer="showAddProductDrawer = false"
      @update-products-list="requestGetAllProducts(page, perPage)"
    />
    <ConfirmPopup />
  </PageContainer>
</template>

<script lang="ts">
import AddEditProductDrawer from '@/components/products/AddEditProductDrawer.vue'
import type { Product } from '@/interfaces/IProduct'
import { deleteProduct, getAllProducts } from '@/services/products/productsService'

export default {
  components: { AddEditProductDrawer },
  data() {
    return {
      items: [{ label: 'Produtos', route: '/products' }],
      products: [],
      columns: [
        { field: 'name', header: 'Nome' },
        { field: 'description', header: 'Descrição' },
        { field: 'quantity', header: 'Quantidade' },
      ],
      productToEdit: {
        id: '',
        name: '',
        description: '',
        quantity: 0,
      },
      page: 1,
      perPage: 10,
      showAddProductDrawer: false,
      isEditing: false,
    }
  },
  created() {
    this.requestGetAllProducts(this.page, this.perPage)
  },
  methods: {
    async requestGetAllProducts(page: number, perPage: number) {
      try {
        const response = await getAllProducts(page, perPage)
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
    async requestDeleteProduct(id: string) {
      try {
        await deleteProduct(id)
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
    confirmDeleteProduct(id: string) {
      this.$confirm.require({
        message: 'Tem certeza que deseja remover esse produto?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
        },
        acceptProps: {
          label: 'Remover',
          severity: 'danger',
        },
        accept: async () => {
          await this.requestDeleteProduct(id)
          this.products = this.products.filter((product: Product) => product.id !== id)

          this.$toast.add({
            severity: 'info',
            detail: 'Produto removido',
            life: 3000,
          })
        },
      })
    },
    showAddEditProductDrawer(isEditing: boolean, product?: Product): void {
      if (product) {
        this.productToEdit = {
          id: product.id || '',
          name: product.name,
          description: product.description,
          quantity: product.quantity,
        }
        this.isEditing = isEditing
      }
      this.showAddProductDrawer = true
    },
  },
}
</script>
