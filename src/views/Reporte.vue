<template>
    <div>
        <h1>Esta es la vista de reporte</h1>
        <div>
          <h2>hola</h2>
        </div>
    </div>
</template>

<script>
import { throws } from 'assert';
export default {
  name: 'reporte',
  components: {

  },
  computed:{
    cuentaActual(){
      return this.$store.state.CUENTA_ACTUAL
    },
    ingresosCuentaActual(){
      return this.$store.state.CUENTAS.filter(cuenta => cuenta.id === this.cuentaActual)[0].ingresos
    },
    egresosCuentaActual(){
      return this.$store.state.CUENTAS.filter(cuenta => cuenta.id === this.cuentaActual)[0].egresos
    },
    ingresosEgresos(){
      var merged = [].concat.apply([], this.ingresosCuentaActual)
      var merged = merged.concat.apply(merged,this.egresosCuentaActual)
      return merged
    }
  },
  methods:
  { 
  }
}
</script>

<style scoped>

</style>
