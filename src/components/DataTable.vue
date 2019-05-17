<template>
  <div class="hello">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
    >
    <v-toolbar flat color="white">
      <v-toolbar-title>{{obtenerNombreCuenta()}}</v-toolbar-title>
    </v-toolbar>

    <v-layout>
    <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn  color="#3C3C3C" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card class="popup">
          <v-responsive :height = 500>
          <v-card-title>
            <span class="headline">{{ titulo }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-autocomplete :items="categorias()" item-text="nombre" item-value="nombre" v-model="itemEditado.categoria" label ="Categoría" required></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="itemEditado.descripcion" label="Descripción"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="itemEditado.monto" label="Monto (Bs.)" type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="itemEditado.fecha" label="Fecha" type="date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <div class = "divisor"></div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="cerrar">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="salvar">salvar</v-btn>
          </v-card-actions>
          </v-responsive>
        </v-card>
      </v-dialog>
      </v-layout>
      <v-data-table :headers="headers" :items="escogerTransaccion()" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.ntrans }}</td>
        <td class="text-xs-right">{{ props.item.descripcion }}</td>
        <td class="text-xs-right">{{ props.item.monto }}</td>
        <td class="text-xs-right">{{ props.item.fecha }}</td>
        <td class="text-xs-right">{{ props.item.categoria }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editarItem(props.item)">edit</v-icon>
          <v-icon small @click="borrarItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="obtenerNombreCuenta">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Número de transacción',
        align: 'left',
        sortable: false,
        value: 'ntrans'
      },
      { text: 'Descripción', value: 'descripcion', sortable: false },
      { text: 'Monto', value: 'monto' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Categoría', value: 'categoria', sortable: false },
      { text: 'Acciones', value: 'name', sortable: false }
    ],
    indexEditado: -1,
    itemEditado: {
      ntrans: 0,
      descripcion: '',
      monto: 0.0,
      fecha: '',
      categoria: ''
    },
    itemPorDefecto: {
      ntrans: 0,
      descripcion: '',
      monto: 0.0,
      fecha: '',
      categoria: ''
    }
  }),

  computed: {
    cuentas () {
      return this.$store.state.CUENTAS
    },
    cuentaActual () {
      return this.$store.state.CUENTA_ACTUAL
    },
    tipoTransaccion () {
      return this.$store.state.TIPO_TRANSACCION
    },
    categoriasIngresos () {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriasEgresos () {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    titulo () {
      return this.indexEditado === -1 ? 'Nueva Transacción' : 'Editar Transacción'
    }
  },

  watch: {
    dialog (val) {
      val || this.cerrar()
    }
  },

  methods: {
    categorias () {
      if (this.tipoTransaccion === 'Ingresos') {
        return this.categoriasIngresos
      } else {
        return this.categoriasEgresos
      }
    },
    escogerTransaccion () {
      var cuenta = this.cuentas.find(cuenta => cuenta.id === this.cuentaActual)
      if (this.tipoTransaccion === 'Ingresos') {
        return cuenta.ingresos
      } else {
        return cuenta.egresos
      }
    },
    editarItem (item) {
      this.indexEditado = this.escogerTransaccion().findIndex(
        transaccion => transaccion.ntrans === item.ntrans
      )
      this.itemEditado = Object.assign({}, item)
      this.dialog = true
    },
    borrarItem (item) {
      var trans = this.escogerTransaccion()
      let idTrans = item.ntrans
      let indexTrans = trans.findIndex(
        transaccion => transaccion.ntrans === idTrans
      )
      confirm('¿Seguro que quiere borrar este item?') &&
        trans.splice(indexTrans, 1)
    },
    cerrar () {
      this.dialog = false
      setTimeout(() => {
        this.itemEditado = Object.assign({}, this.itemPorDefecto)
        this.indexEditado = -1
      }, 300)
    },

    salvar () {
      this.itemEditado.monto = parseFloat(this.itemEditado.monto)
      var auxFecha = this.itemEditado.fecha.toString().replace('-', '/')
      this.itemEditado.fecha = auxFecha.replace('-', '/')
      this.itemEditado.categoria = this.itemEditado.categoria.toString()
      console.log(this.itemEditado.categoria)
      var indexTrans = -1
      do {
        this.itemEditado.ntrans = Math.round(Math.random() * (999999 - 100000) + 100000)
        indexTrans = this.escogerTransaccion().findIndex(transaccion => transaccion.ntrans === this.itemEditado.ntrans)
      } while (indexTrans > 0)
      var condicion = true
      if (this.itemEditado.monto < 1) {
        condicion = false
        alert('El monto ingresado no puede ser menor a 1')
      } else if (this.itemEditado.fecha === '' || this.itemEditado.fecha === '') {
        condicion = false
        alert('La fecha no puede estar vacía')
      } else if (this.itemEditado.categoria.length === 0) {
        condicion = false
        alert('La categoría no puede estar vacía')
      } else if (this.itemEditado.monto > this.obtenerSaldo() && this.tipoTransaccion === 'Egregsos') {
        condicion = false
        alert('¡No tiene suficiente saldo para realizar este gasto!')
      }

      if (condicion) {
        if (this.indexEditado > -1) {
          Object.assign(
            this.escogerTransaccion()[this.indexEditado],
            this.itemEditado
          )
        } else {
          this.escogerTransaccion().push(this.itemEditado)
        }
        this.cerrar()
      }
    },
    obtenerNombreCuenta (cuentaActual) {
      var idCuentaActual = this.cuentaActual
      let cuenta1 = this.cuentas.find(cuenta => cuenta.id === idCuentaActual)
      return cuenta1 === undefined
        ? 'Seleccionar Cuenta'
        : cuenta1.nombre + '.  Saldo: ' + this.obtenerSaldo() + 'Bs'
    },
    obtenerSaldo () {
      let idCuentaActual = this.cuentaActual
      let cuenta1 = this.cuentas.find(cuenta => cuenta.id === idCuentaActual)
      let listaIngresos = cuenta1.ingresos
      let listaEgresos = cuenta1.egresos
      let ingresosTotales = 0
      let egresosTotales = 0

      listaIngresos.forEach(transaccion => {
        ingresosTotales += transaccion.monto
      })
      listaEgresos.forEach(transaccion => {
        egresosTotales += transaccion.monto
      })
      return ingresosTotales - egresosTotales
    }
  },
  nombre: 'DataTable'
}
</script>

<style scoped>
.divisor {
  margin-top: 160px;
}
</style>
