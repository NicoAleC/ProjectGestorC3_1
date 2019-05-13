<template>
  <div class="grilla">
    <div class="grid-item">
      <ListaCuentas class="listaCuentas"></ListaCuentas>
    </div>
    <div class="grid-item-1">
      <div class = "trans">
        <EscogerTransaccion class = "escogerTransaccion"></EscogerTransaccion>
      </div>
      <div class="data">
        <DataTable class = "data"></DataTable>
      </div>
    </div>
    <div class="grid-item">
      <CategoryForm class="categoryForm"></CategoryForm>
    </div>
    <div class="grid-item">
      <Transfer class = "transfer"></Transfer>
    </div>
  </div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas.vue'
import DataTable from '@/components/DataTable.vue'
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
.grid-item-1{
  display: grid;
  height: 50;
}

.data {
  width: 800px;
  height: auto;;
}

.trans{
height: 50px;
}
</style>
