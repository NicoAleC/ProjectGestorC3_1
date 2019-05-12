<template>

<div>

  <ListaCuentas class="listaCuentas"></ListaCuentas>
  <DataTable class = "dataTable"></DataTable>
  <CategoryForm class="categoryForm"></CategoryForm>
  <EscogerTransaccion class = "escogerTransaccion"></EscogerTransaccion>
</div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas'
import DataTable from '@/components/DataTable'
import CategoryForm from '@/components/CategoryForm.vue'
import EscogerTransaccion from '@/components/EscogerTransaccion.vue'

export default {
  components: {
    ListaCuentas: ListaCuentas,
    DataTable: DataTable,
    CategoryForm: CategoryForm,
    EscogerTransaccion: EscogerTransaccion
  }
}
</script>

<style scoped>

.listaCuentas{
  float: left;
}
.dataTable{
  float: left;
  top: 300px
}
.categoryForm{
  float: left;
}
.escogerTransaccion{
  position: absolute;
  bottom: 280px;
  right: 500px
}
</style>
