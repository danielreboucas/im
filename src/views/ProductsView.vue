<template>
  <PageContainer title="Produtos" :items="items">
    <Button
      label="Adicionar produto"
      icon="pi pi-plus"
      @click="showAddEditProductDrawer((isEditing = false))"
    />
    <DataTable
      tableStyle="min-width: 50rem;"
      scrollable
      scrollHeight="400px"
      class="pt-4 shadow-md"
      size="large"
      :paginator="true"
      :lazy="true"
      :value="products"
      :rows="perPage"
      :totalRecords="total"
      :first="(page - 1) * perPage"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      @page="onPageChange"
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
      @update-show-drawer="updateShowDrawer"
      @update-products-list="requestGetAllProducts(page, perPage)"
    />
    <ConfirmPopup />
  </PageContainer>
</template>

<script lang="ts">
import AddEditProductDrawer from '@/components/products/AddEditProductDrawer.vue'
import type { Product } from '@/interfaces/IProduct'
import { deleteProduct, getAllProducts } from '@/services/products/productsService'
import type { DataTablePageEvent } from 'primevue'

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
      perPage: 5,
      total: 0,
      showAddProductDrawer: false,
      isEditing: false,
    }
  },
  created() {
    this.requestGetAllProducts(this.page, this.perPage)
  },
  methods: {
    onPageChange(e: DataTablePageEvent) {
      this.page = e.page + 1
      this.perPage = e.rows
      this.requestGetAllProducts(this.page, this.perPage)
    },
    confirmDeleteProduct(id: string): void {
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
          await this.requestGetAllProducts(this.page, this.perPage)

          this.$toast.add({
            severity: 'info',
            detail: 'Produto removido',
            life: 3000,
          })
        },
      })
    },
    showAddEditProductDrawer(isEditing: boolean, product?: Product): void {
      if (product && isEditing) {
        this.productToEdit = {
          id: product.id || '',
          name: product.name,
          description: product.description,
          quantity: product.quantity,
        }
        this.isEditing = true
      }
      this.showAddProductDrawer = true
    },
    updateShowDrawer(): void {
      this.productToEdit = {
        id: '',
        name: '',
        description: '',
        quantity: 0,
      }
      this.showAddProductDrawer = false
      this.isEditing = false
    },
    async requestGetAllProducts(page: number, perPage: number): Promise<void> {
      try {
        const response = await getAllProducts(page, perPage)
        this.products = response.data

        this.total = response.total
        console.log(response.total)
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
    async requestDeleteProduct(id: string): Promise<void> {
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
  },
}
</script>
