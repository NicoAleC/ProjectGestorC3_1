<template>
  <div class="hello" :id="'Tabla' + tipoTransaccion + cuenta.nombre">
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
          <v-btn color="#3C3C3C" dark class="mb-2" v-on="on" id="NuevoItem">Nuevo Item</v-btn>
        </template>
        <v-card :id="'popup' + cuenta.nombre">
          <v-responsive :height="500">
            <v-card-title>
              <span class="headline">{{ titulo }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      :items="categorias()"
                      item-text="nombre"
                      item-value="nombre"
                      v-model="itemEditado.categoria"
                      label="Categoría"
                      required
                      id="Categoria"
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="itemEditado.descripcion"
                      label="Descripción"
                      id="Descripcion"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="itemEditado.monto"
                      label="Monto (Bs.)"
                      type="number"
                      id="Monto"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="itemEditado.fecha" label="Fecha" type="date" id="Fecha"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <div class="divisor"></div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="cerrar" id="Cancelar">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="salvar" id="Salvar">Salvar</v-btn>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-data-table :headers="headers" :items="escogerTransaccion()" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.ntrans }}</td>
        <td class="text-xs-right" :id="props.item.descripcion">{{ props.item.descripcion }}</td>
        <td class="text-xs-right" :id="props.item.monto">{{ props.item.monto }}</td>
        <td class="text-xs-right" :id="props.item.fecha">{{ props.item.fecha }}</td>
        <td class="text-xs-right" :id="props.item.categoria">{{ props.item.categoria }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editarItem(props.item)" id="Editar">edit</v-icon>
          <v-icon small @click="borrarItem(props.item)" id="Eliminar">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="red" icon="warning" id="ListaVacia">¡Lista vacía! <br> Ingrese nuevas transacciones</v-alert>
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
    cuentas() {
      return this.$store.state.CUENTAS
    },
    cuentaActual() {
      return this.$store.state.CUENTA_ACTUAL
    },
    cuenta() {
      return this.cuentas.find((cuenta) => cuenta.id === this.cuentaActual)
    },
    tipoTransaccion() {
      return this.$store.state.TIPO_TRANSACCION
    },
    categoriasIngresos() {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriasEgresos() {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    titulo() {
      return this.indexEditado === -1
        ? 'Nueva Transacción'
        : 'Editar Transacción'
    }
  },

  watch: {
    dialog(val) {
      val || this.cerrar()
    }
  },

  methods: {
    categorias() {
      if (this.tipoTransaccion === 'Ingresos') {
        return this.categoriasIngresos
      } else {
        return this.categoriasEgresos
      }
    },
    escogerTransaccion() {
      const cuenta = this.cuentas.find(
          (cuenta) => cuenta.id === this.cuentaActual
      )
      if (this.tipoTransaccion === 'Ingresos') {
        return cuenta.ingresos
      } else {
        return cuenta.egresos
      }
    },
    editarItem(item) {
      this.indexEditado = this.escogerTransaccion().findIndex(
          (transaccion) => transaccion.ntrans === item.ntrans
      )
      this.itemEditado = Object.assign({}, item)
      this.dialog = true
    },
    borrarItem(item) {
      const trans = this.escogerTransaccion()
      const idTrans = item.ntrans
      const indexTrans = trans.findIndex(
          (transaccion) => transaccion.ntrans === idTrans
      )
      confirm('¿Seguro que quiere borrar este item?') &&
        this.$store.dispatch('eliminarItem', indexTrans)
    },
    cerrar() {
      this.dialog = false
      setTimeout(() => {
        this.itemEditado = Object.assign({}, this.itemPorDefecto)
        this.indexEditado = -1
      }, 300)
    },
    validarItem() {
      this.itemEditado.monto = parseFloat(this.itemEditado.monto)
      const auxFecha = this.itemEditado.fecha.toString().replace('-', '/')
      this.itemEditado.fecha = auxFecha.replace('-', '/')
      this.itemEditado.categoria = this.itemEditado.categoria.toString()
      console.log(this.itemEditado.categoria)
      let indexTrans = -1
      if (this.titulo.search('Nueva') >= 0) {
        do {
          this.itemEditado.ntrans = Math.round(
              Math.random() * (999999 - 100000) + 100000
          )
          indexTrans = this.escogerTransaccion().findIndex(
              (transaccion) => transaccion.ntrans === this.itemEditado.ntrans
          )
        } while (indexTrans > 0)
      }

      let condicion = true
      if (this.itemEditado.monto <= 0) {
        condicion = false
        alert('El monto ingresado no puede ser menor o igual a 0')
      } else if (this.itemEditado.fecha === '') {
        condicion = false
        alert('La fecha no puede estar vacía')
      } else if (this.itemEditado.categoria.length === 0) {
        condicion = false
        alert('La categoría no puede estar vacía:' + this.itemEditado.categoria)
      } else if (
        this.itemEditado.monto > this.obtenerSaldo() &&
        this.tipoTransaccion === 'Egresos'
      ) {
        condicion = false
        alert('¡No tiene suficiente saldo para realizar este gasto!')
      }
      return condicion
    },

    salvar() {
      const condicion = this.validarItem()
      if (condicion) {
        if (this.indexEditado > -1) {
          const datosItem = [this.indexEditado, this.itemEditado]
          this.$store.dispatch('modificarItem', datosItem)
        } else {
          this.$store.dispatch('guardarItem', this.itemEditado)
        }
        this.cerrar()
      }
    },
    obtenerNombreCuenta(cuentaActual) {
      const idCuentaActual = this.cuentaActual
      const cuenta1 = this.cuentas.find((cuenta) => cuenta.id === idCuentaActual)
      return cuenta1 === undefined
        ? 'Seleccionar Cuenta'
        : cuenta1.nombre + '.  Saldo: ' + this.obtenerSaldo() + 'Bs'
    },
    obtenerSaldo() {
      const idCuentaActual = this.cuentaActual
      const cuenta1 = this.cuentas.find((cuenta) => cuenta.id === idCuentaActual)
      const listaIngresos = cuenta1.ingresos
      const listaEgresos = cuenta1.egresos
      let ingresosTotales = 0
      let egresosTotales = 0

      listaIngresos.forEach((transaccion) => {
        ingresosTotales += transaccion.monto
      })
      listaEgresos.forEach((transaccion) => {
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
