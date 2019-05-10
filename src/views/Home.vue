<template>
  <div class="home">
    <ListaCuentas class="listas"/>
    <DataTable class="data"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'
import ListaCuentas from '@/components/ListaCuentas.vue'

export default {
  name: 'home',
  components: {
    DataTable,
    ListaCuentas
  }
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.listas {
  float: left;
}

.data {
  float: left;
}

</style>
