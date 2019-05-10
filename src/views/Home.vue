<template>
<div>
  <ListaCuentas class="listaCuentas"></ListaCuentas>
  <DataTable class = "dataTable"></DataTable>
</div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas'
import DataTable from '@/components/DataTable'

  export default {
    components: {
      ListaCuentas: ListaCuentas,
      DataTable:DataTable
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

