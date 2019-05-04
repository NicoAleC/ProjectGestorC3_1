<template>
  <div class="hello">
    <h1>Esta es la pagina de inicio de secion</h1>
    <h2>Mensaje recibido: {{ msg }}</h2>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
