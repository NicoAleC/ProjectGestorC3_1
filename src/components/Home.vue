<template>
  <div class="hello">
    <ListaCuentas></ListaCuentas>
  </div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas.vue'
export default {
  name: 'HelloWorld',
  components: {
    ListaCuentas: ListaCuentas,
  },

}
</script>

<style scoped>

</style>
