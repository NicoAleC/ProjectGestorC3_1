<template>
  <div class="listaCuentas">
      <Cuenta
        id= "cuenta.id"
        v-for="cuenta in cuentas"
        :key="cuenta.id"
      ></Cuenta>
    <button @click="anadirCuenta">Crear Cuenta</button>
  </div>

</template>

<script>
import Cuenta from '@/components/Cuenta.vue'

export default {
  name: 'ListaCuentas',

  components:{
    Cuenta: Cuenta
  },
 
  computed: {
    cuentas(){
      return this.$store.state.CUENTAS
    }
  },

  methods:{
    anadirCuenta(){
      var nuevaCuenta = {id: 0,nombre: 'Cuenta ' + id,transacciones: {}}
      this.$store.dispatch('addAccounts', nuevaCuenta)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
