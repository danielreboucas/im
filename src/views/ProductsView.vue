<template>
  <PageContainer title="Produtos" :items="items">
    <Button label="Adicionar produto" icon="pi pi-plus" @click="showAddProductDrawer = true" />
    <DataTable
      v-model:selection="selectedProduct"
      :value="products"
      tableStyle="min-width: 50rem"
      editMode="row"
      scrollable
      scrollHeight="400px"
      class="pt-8 shadow-md"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center" />
    </DataTable>
    <AddProductDrawer
      :showAddProductDrawer="showAddProductDrawer"
      @update-show-drawer="showAddProductDrawer = false"
      @update-products-list="requestGetAllProducts(page, perPage)"
    />
  </PageContainer>
</template>

<script lang="ts">
import AddProductDrawer from '@/components/products/AddProductDrawer.vue'
import { getAllProducts } from '@/services/products/productsService'

export default {
  components: { AddProductDrawer },
  data() {
    return {
      items: [{ label: 'Produtos', route: '/products' }],
      products: [],
      columns: [
        { field: 'name', header: 'Nome' },
        { field: 'description', header: 'Descrição' },
        { field: 'quantity', header: 'Quantidade' },
      ],
      editingRows: [],
      selectedProduct: [],
      page: 1,
      perPage: 10,
      showAddProductDrawer: false,
    }
  },
  watch: {
    selectedProduct(value) {
      console.log(value)
    },
  },
  created() {
    this.requestGetAllProducts(this.page, this.perPage)
  },
  methods: {
    async requestGetAllProducts(page: number, perPage: number) {
      try {
        const response = await getAllProducts(page, perPage)
        this.products = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
