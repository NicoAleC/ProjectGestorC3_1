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
        <select @change="categoriaASeleccionar()" v-model="selectedCategory">
            <option value="" selected disabled hidden>Elija la Categoria</option>
            <option :key="index" v-bind:value="categoria.nombre"
            v-for="(categoria, index) in todasLasCategorias">{{categoria.nombre}}</option>
          </select>
        </div>
    </div>
</template>

<script>
import { throws } from 'assert'
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
    var listaUnica = [].concat([], this.ingresosCuentaActual)
    listaUnica = listaUnica.concat(listaUnica, this.egresosCuentaActual)
    this.nuevaList = listaUnica
  },
  computed: {
    cuentaActual() {
      return this.$store.state.CUENTA_ACTUAL
    },
    ingresosCuentaActual() {
      return this.$store.state.CUENTAS.filter((cuenta) => cuenta.id === this.cuentaActual)[0].ingresos
    },
    egresosCuentaActual() {
      return this.$store.state.CUENTAS.filter((cuenta) => cuenta.id === this.cuentaActual)[0].egresos
    },
    ingresosEgresos() {
      var listaUnica = [].concat([], this.ingresosCuentaActual)
      listaUnica = listaUnica.concat(listaUnica, this.egresosCuentaActual)
      return listaUnica
    },
    categoriasIngresos() {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriasEgresos() {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    todasLasCategorias() {
      let listaCategorias = [].concat([], [this.categoriasIngresos])
      listaCategorias = listaCategorias.concat(listaCategorias, [this.categoriasEgresos])
      return listaCategorias
    }
  },
  methods:
  {
    cadenaAFecha(fecha) {
      const tipoFecha = new Date(fecha)
      return tipoFecha
    },
    categoriaASeleccionar() {
      this.nuevaList = []
      let index
      const listaPorCategoria = []
      for (index = 0; index < this.ingresosEgresos.length; index++) {
        if (this.ingresosEgresos[index].categoria === this.selectedCategory) {
          listaPorCategoria.push(this.ingresosEgresos[index])
        }
      }
      this.nuevaList = listaPorCategoria
    }
  }
}
</script>

<style scoped>

</style>
