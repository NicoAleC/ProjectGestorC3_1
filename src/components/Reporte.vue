<template>
    <div>
        <h1>Reportes</h1>
        <div class="grilla-botones">
        <div class="grilla-item">
          <select  @change="categoriaASeleccionar()" v-model="selectedCategory">
            <option value="" selected disabled hidden>Elija la Categoria</option>
            <option :key="index" v-bind:value="categoria.nombre"
            v-for="(categoria, index) in todasLasCategorias">{{categoria.nombre}}</option>
          </select>
        </div>
        <div class= "grilla-item">
          <input class="entrada" v-model="anio" placeholder="Año">
          <input class="entrada" v-model="mes" placeholder="Mes">
          <input class="entrada" v-model="dia" placeholder="Dia" v-on:keyup.enter="fechaASeleccionar">
        </div>
        </div>
        <div>
          <table style="width:100%" id="customers">
            <tr>
              <th># Transacción</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Categoria</th>
            </tr>
            <tr v-bind:style="{backgroundColor : item.color}" class="reporteIndividual" v-bind:key ="item.ntrans" v-for="item in nuevaList">
              <td>{{ item.ntrans }}</td>
              <td>{{ item.descripcion }}</td>
              <td>{{ item.monto }}</td>
              <td>{{ item.fecha }}</td>
              <td>{{ item.categoria }}</td>
            </tr>
          </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'reporte',
  components: {

  },
  data() {
    return {
      anio: '',
      mes: '',
      dia: '',
      selectedCategory: '',
      nuevaList: []
    }
  },
  mounted() {
    let listaUnica = []
    listaUnica = listaUnica.concat(...this.ingresosCuentaActual, ...this.egresosCuentaActual)
    this.nuevaList = listaUnica
  },
  computed: {
    cuentaActual() {
      return this.$store.state.CUENTA_ACTUAL
    },
    ingresosCuentaActual() {
      let listaIngresos = []
      listaIngresos = this.$store.state.CUENTAS.filter((cuenta) => cuenta.id === this.cuentaActual)[0].ingresos
      let index
      for (index = 0; index < listaIngresos.length; index++) {
        listaIngresos[index].color = 'lightgreen'
      }
      return listaIngresos
    },
    egresosCuentaActual() {
      let listaEgresos = []
      listaEgresos = this.$store.state.CUENTAS.filter((cuenta) => cuenta.id === this.cuentaActual)[0].egresos
      let index
      for (index = 0; index < listaEgresos.length; index++) {
        listaEgresos[index].color = 'lightcoral'
      }
      return listaEgresos
    },
    ingresosEgresos() {
      let listaUnica = []
      listaUnica = listaUnica.concat(...this.ingresosCuentaActual, ...this.egresosCuentaActual)
      return listaUnica
    },
    categoriasIngresos() {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriasEgresos() {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    todasLasCategorias() {
      let listaCategorias = []
      listaCategorias = listaCategorias.concat(...this.categoriasIngresos, ...this.categoriasEgresos)
      return listaCategorias
    }
  },
  methods:
  {
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
    },
    fechaASeleccionar() {
      this.nuevaList = []
      let index
      let fechaBuscada = ''
      fechaBuscada = fechaBuscada.concat(this.anio, '/', this.mes, '/', this.dia)
      const listaPorCategoria = []
      for (index = 0; index < this.ingresosEgresos.length; index++) {
        if (this.ingresosEgresos[index].fecha === fechaBuscada) {
          listaPorCategoria.push(this.ingresosEgresos[index])
        }
      }
      this.nuevaList = listaPorCategoria
    }
  }
}
</script>

<style scoped>
#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: gray;
  color: white;
}
.grilla-botones{
  display: grid;
  grid-template-columns: auto auto;
  background-color: gray;
  padding: 10px;
}
.grilla-item{
  width: 100%;
  color: white;
  border: 1.5px solid rgba(255, 255, 255, 1);
  font-size: 18px;
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 0.01px black;
}
.entrada{
  width: 33.33%;
  grid-template-columns: auto auto auto;
  border: 1px solid gray;
  font-size: 18px;
  color: white;
  -webkit-text-fill-color: black;
  -webkit-text-stroke: 0.01px white;
}
::placeholder{
  color: black;
  background-color: white;
}
h1 {
  color: #42b983;
}
</style>
