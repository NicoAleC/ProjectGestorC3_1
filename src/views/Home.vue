<template>

<div>
  <ListaCuentas class="listaCuentas"></ListaCuentas>
  <DataTable class = "dataTable"></DataTable>
  <CategoryForm/>
</div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas'
import DataTable from '@/components/DataTable'
import CategoryForm from '@/components/CategoryForm.vue'


  export default {
    components: {
      ListaCuentas: ListaCuentas,
      DataTable:DataTable,
      CategoryForm
    }
  }
</script>

<style scoped>

.listaCuentas{
  float: left;
}
.dataTable{
  float: left; 
}

</style>

