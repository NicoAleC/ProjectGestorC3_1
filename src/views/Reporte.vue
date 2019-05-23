<template>
    <div>
        <h1>Esta es la vista de reporte</h1>
        <div>
          <ul id="reporte">
            <li v-bind:key="item.ntrans" v-for="item in nuevaList">
              {{ item.ntrans }}
              {{ item.descripcion }}
              {{ item.monto }}
              {{ item.fecha }}
              {{ item.categoria }}
            </li>
          </ul>
        </div>
        <div>
        <select @change="printSelectedCategory()" v-model="selectedCategory">
            <option :key="index" v-bind:value="categoria.nombre" 
            v-for="(categoria, index) in todasLasCategorias">{{categoria.nombre}}</option>
          </select>
        </div>
    </div>
</template>

<script>
import { throws } from 'assert';
export default {
  name: 'reporte',
  components: {

  },
  data() {
    return {
      categoriaSeleccionada: null,
      selectedCategory: '',
      nuevaList: []
    }
    
  },
  mounted() {
    var listaUnica = [].concat.apply([], this.ingresosCuentaActual)
    var listaUnica = listaUnica.concat.apply(listaUnica,this.egresosCuentaActual)
    this.nuevaList = listaUnica
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
    categoriasIngresos(){
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriasEgresos(){
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    todasLasCategorias(){
      var listaCategorias = [].concat.apply([],[this.categoriasIngresos])
      var listaCategorias = listaCategorias.concat.apply(listaCategorias,[this.categoriasEgresos])
      return listaCategorias
    }
  },
  methods:
  {
    cadenaAFecha(fecha){
      var tipoFecha= new Date(fecha)
      return tipoFecha
    },
    printSelectedCategory() {
      this.nuevaList = [];
      console.log('------' + this.selectedCategory)
    }
  }
}
</script>

<style scoped>

</style>
