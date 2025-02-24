<template>
  <PageContainer title="Vendas" :items="items">
    <DataTable
      tableStyle="min-width: 50rem;"
      class="shadow-md"
      scrollable
      scrollHeight="400px"
      size="large"
      removableSort
      :sortField="sortField"
      :sortOrder="sortOrder"
      :paginator="true"
      :lazy="true"
      :value="sales"
      :rows="perPage"
      :totalRecords="total"
      :first="(page - 1) * perPage"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      @page="onPageChange"
      @sort="onSort"
    >
      <template #header>
        <div class="flex justify-between">
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters.name" placeholder="Nome" @input="onFilter" />
          </IconField>

          <Button
            label="Adicionar venda"
            icon="pi pi-plus"
            @click="showAddEditSaleDrawer((isEditing = false))"
          />
        </div>
      </template>

      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
      >
        <template #body="slotProps">
          {{ col.field === 'totalPrice' ? 'R$' : '' }}
          {{ col.field !== '_count' ? slotProps.data[col.field] : slotProps.data['_count'].items }}
        </template>
      </Column>
      <Column style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="slotProps">
          <div class="flex gap-4">
            <Button
              icon="pi pi-eye"
              severity="secondary"
              @click="showViewSaleDrawer(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              severity="secondary"
              @click="confirmDeleteSale(slotProps.data.id)"
            />
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              @click="showAddEditSaleDrawer((isEditing = true), slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <AddEditSaleDrawer
      :showAddSaleDrawer="showAddSaleDrawer"
      :isEditing="isEditing"
      :saleToEdit="sale"
      @update-show-drawer="updateShowDrawer"
      @update-sales-list="requestGetAllSales(page, perPage)"
    />
    <ViewSaleDrawer
      :showViewSaleDrawer="showViewSale"
      :saleId="sale.id"
      @update-show-drawer="updateShowDrawer"
    />
    <ConfirmPopup />
  </PageContainer>
</template>

<script lang="ts">
import AddEditSaleDrawer from '@/components/sales/AddEditSaleDrawer.vue'
import ViewSaleDrawer from '@/components/sales/ViewSaleDrawer.vue'
import type { Sale } from '@/interfaces/ISale'
import { deleteSale, getAllSales } from '@/services/sales/salesService'
import { formatSortOrder } from '@/utils/formatSort'
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue'

export default {
  components: { AddEditSaleDrawer, ViewSaleDrawer },
  data() {
    return {
      items: [{ label: 'Vendas', route: '/sales' }],
      sales: [],
      columns: [
        { field: 'name', header: 'Nome' },
        { field: 'description', header: 'Descrição' },
        { field: 'totalPrice', header: 'Preço Total', sortable: true },
        { field: '_count', header: 'Qtde de Produtos' },
      ],
      sale: {
        id: '',
        name: '',
        description: '',
      },
      filters: {
        name: '',
      },
      sortField: '' as string | ((item: any) => string) | undefined,
      sortOrder: undefined as 0 | 1 | -1 | undefined,
      page: 1,
      perPage: 5,
      total: 0,
      showAddSaleDrawer: false,
      showViewSale: false,
      isEditing: false,
      debounceTimer: null as any,
    }
  },
  created() {
    this.requestGetAllSales(this.page, this.perPage)
  },
  methods: {
    onPageChange(e: DataTablePageEvent) {
      this.page = e.page + 1
      this.perPage = e.rows
      this.requestGetAllSales(this.page, this.perPage)
    },
    confirmDeleteSale(id: string): void {
      this.$confirm.require({
        message: 'Tem certeza que deseja remover essa venda?',
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
          await this.requestDeleteSale(id)
          await this.requestGetAllSales(this.page, this.perPage)

          this.$toast.add({
            severity: 'info',
            detail: 'Venda removida',
            life: 3000,
          })
        },
      })
    },
    showAddEditSaleDrawer(isEditing: boolean, sale?: Sale): void {
      if (sale && isEditing) {
        this.sale = {
          id: sale.id || '',
          name: sale.name,
          description: sale.description,
        }
        this.isEditing = true
      }
      this.showAddSaleDrawer = true
    },
    showViewSaleDrawer(sale: Sale): void {
      this.sale = {
        id: sale.id!,
        name: sale.name,
        description: sale.description,
      }
      this.showViewSale = true
    },
    updateShowDrawer(): void {
      this.sale = {
        id: '',
        name: '',
        description: '',
      }
      this.showAddSaleDrawer = false
      this.showViewSale = false
      this.isEditing = false
    },
    onSort(event: DataTableSortEvent) {
      this.sortField = event.sortField
      this.sortOrder = event.sortOrder!
      this.page = 1
      this.requestGetAllSales(this.page, this.perPage)
    },
    onFilter() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.page = 1
        this.requestGetAllSales(this.page, this.perPage)
      }, 300)
    },
    async requestGetAllSales(page: number, perPage: number): Promise<void> {
      try {
        const response = await getAllSales(
          page,
          perPage,
          formatSortOrder(this.sortOrder),
          this.filters.name,
        )
        this.sales = response.data
        this.total = response.total
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
    async requestDeleteSale(id: string): Promise<void> {
      try {
        await deleteSale(id)
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
