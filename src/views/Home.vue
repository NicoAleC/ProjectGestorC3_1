<template>
  <div class="home">
    <h1>HOLA
    </h1>
    <DataTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'home',
  components: {
    DataTable
  }
}
</script>
