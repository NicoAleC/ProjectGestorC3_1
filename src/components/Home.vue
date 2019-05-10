<template>
  <div class="hello"> 

    <ListaCuentas></ListaCuentas>
    <CategoryForm></CategoryForm>
    
  </div>
</template>

<script>
import ListaCuentas from '@/components/ListaCuentas.vue'
import Formulario from '@/components/CategoryForm.vue'
export default {
  name: 'HelloWorld',
  components:{
    ListaCuentas: ListaCuentas,
    Formulario: Formulario,
  },
 
}
</script>


<style scoped>
  
</style>
