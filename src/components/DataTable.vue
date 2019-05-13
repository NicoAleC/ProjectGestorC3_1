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
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card class="popup">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-autocomplete :items="categorias()" item-text="nombre" item-value="nombre" v-model="editedItem.categoria" label ="Categoría" required></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.monto" label="Monto (Bs.)" type="number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fecha" label="Fecha" type="date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
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
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Monto', value: 'monto' },
      { text: 'Fecha', value: 'fecha' },
      { text: 'Categoría', value: 'categoria' },
      { text: 'Acciones', value: 'name', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      ntrans: 0,
      descripcion: '',
      monto: 0.0,
      fecha: '',
      categoria: ''
    },
    defaultItem: {
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
    formTitle () {
      return this.editedIndex === -1 ? 'Nueva Transacción' : 'Editar Transacción'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    categorias(){
      if(this.tipoTransaccion === 'Ingresos'){
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
    editItem (item) {
      this.editedIndex = this.escogerTransaccion().findIndex(
        transaccion => transaccion.ntrans === item.ntrans
      )
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      var trans = this.escogerTransaccion()
      let idTrans = item.ntrans
      let indexTrans = trans.findIndex(
        transaccion => transaccion.ntrans === idTrans
      )
      confirm('Are you sure you want to delete this item?') &&
        trans.splice(indexTrans, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.editedItem.monto = parseFloat(this.editedItem.monto)
      this.editedItem.fecha = this.editedItem.fecha.toString()
      var indexTrans = -1
      do {
        this.editedItem.ntrans = Math.round(Math.random() * (999999 - 100000) + 100000)
        indexTrans = this.escogerTransaccion().findIndex(transaccion => transaccion.ntrans === this.editedItem.ntrans)
      } while (indexTrans > 0)
      var condicion = true
      if (this.editedItem.monto < 1) {
        condicion = false
        alert('El monto ingresado no puede ser menor a 1')
      } else if (this.editedItem.fecha === '') {
        condicion = false
        alert('La fecha no puede estar vacía')
      } else if(this.editItem.categoria === '') {
        condicion = false
        alert('La categoría no puede estar vacía')
      }
      if (condicion){
        if (this.editedIndex > -1) {
          Object.assign(
            this.escogerTransaccion()[this.editedIndex],
            this.editedItem
          );
        } else {
          this.escogerTransaccion().push(this.editedItem);
        }
        this.close()
      }
    },
    obtenerNombreCuenta (cuentaActual) {
      var idCuentaActual = this.cuentaActual
      let cuenta1 = this.cuentas.find(cuenta => cuenta.id === idCuentaActual)
      return cuenta1 === undefined
        ? 'Seleccionar Cuenta'
        : cuenta1.nombre + '.  Saldo: ' + this.obtenerSaldo() + 'Bs'
    },

    // Transaccion = {Descripcion: , Monto: , Fecha: , Categoria: }
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
  name: 'DataTable'
}
</script>

<style scoped>

</style>
