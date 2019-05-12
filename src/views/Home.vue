<template>

<div class="grilla">
  <div class="grid-item">
    <ListaCuentas class="listaCuentas"></ListaCuentas>
  </div>
  <div class="grid-item">
      <DataTable class = "dataTable"></DataTable>
  </div>
  <div class="grid-item">
    <CategoryForm class="categoryForm"></CategoryForm>
  </div>
  <div class="grid-item">
    <Transfer class = "transfer"></Transfer>
  </div>
  <div class="grid-item">
    <EscogerTransaccion class = "escogerTransaccion"></EscogerTransaccion>
  </div>
</div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas'
import DataTable from '@/components/DataTable'
import CategoryForm from '@/components/CategoryForm.vue'
import EscogerTransaccion from '@/components/EscogerTransaccion.vue'
import Transfer from '@/components/Transfer.vue'

export default {
  components: {
    ListaCuentas: ListaCuentas,
    DataTable: DataTable,
    CategoryForm: CategoryForm,
    EscogerTransaccion: EscogerTransaccion,
    Transfer: Transfer
  }
}
</script>

<style scoped>
.grilla {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  padding: 10px;
}
</style>
