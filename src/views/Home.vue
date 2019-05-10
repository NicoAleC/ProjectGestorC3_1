<template>

<div>
  <ListaCuentas class="listaCuentas"></ListaCuentas>
  <DataTable class = "dataTable"></DataTable>
  <!--<CategoryList class="categoryList"></CategoryList>-->
  <CategoryForm class="categoryForm"></CategoryForm>
</div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas'
import DataTable from '@/components/DataTable'
import CategoryForm from '@/components/CategoryForm.vue'
import CategoryList from '@/components/CategoryList.vue'



  export default {
    components: {
      ListaCuentas: ListaCuentas,
      DataTable:DataTable,
      CategoryForm,
      CategoryList
    }
  }
</script>

<style scoped>

.listaCuentas{
  float: left;
}
.dataTable{
  float: left; 
}.categoryForm{
  float: left;
}

</style>

