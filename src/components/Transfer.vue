<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Transferir</v-btn>
      </template>
      <v-card>
        <v-responsive :height = 500>
        <v-card-title>
          <span class="headline">Transferencia</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <v-layout wrap>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="cuentas"
                  item-text = "nombre"
                  item-value = "id"
                  v-model= "selectedaccount"
                  label="Cuenta"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Cantidad" required
                  v-model= "amount"
               >{{amount}}</v-text-field>
              </v-flex>
            </v-layout>

          </v-container>
          <small>Elija la cuenta a transferir y la cantidad:</small>
          <small> {{ fecha }} </small>
        </v-card-text>
        <div class = "divisor"></div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color= #3C3C3C flat @click="dialog = false">Close</v-btn>
          <v-btn color= #3C3C3C flat @click="saveTransfer">Transferir</v-btn>
        </v-card-actions>
        </v-responsive>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    selectedaccount: null,
    amount: null,
  }),
  computed: {
    cuentas () {
      return this.$store.state.CUENTAS
    },
    cuentaActual () {
      return this.$store.state.CUENTA_ACTUAL
    },
    fecha () {
      var myDate = new Date()
      var month = ('0' + (myDate.getMonth() + 1)).slice(-2)
      var date = ('0' + myDate.getDate()).slice(-2)
      var year = myDate.getFullYear()
      var formattedDate = date + '/' + month + '/' + year
      return formattedDate
    }
  },
  methods: {
    close () {
      this.dialog = false
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
    },
    saveTransfer () {
      let indexCuentaAenviar = this.cuentas.findIndex(cuenta => cuenta.id === this.selectedaccount)

      // egreso a nuestra cuenta
      let indexCuentaActual = this.cuentas.findIndex(cuenta => cuenta.id === this.cuentaActual)
      var cuentaActual = this.cuentas[indexCuentaActual]
      var egresosCuentaActual = cuentaActual.egresos

      var nuevoEgreso = { ntrans: Math.random().toString(36).substring(2, 15),
        descripcion: 'Transferencia a' + this.cuentas[indexCuentaAenviar].nombre,
        monto: parseFloat(this.amount),
        fecha: this.fecha,
        categoria: 'Transferencia' }

      // ingreso a la cuentaAenviar
      var cuentaAenviar = this.cuentas[indexCuentaAenviar]
      var ingresosCuentaAenviar = cuentaAenviar.ingresos

      var nuevoIngreso = { ntrans: Math.random().toString(36).substring(2, 15),
        descripcion: 'Transferencia de' + this.cuentas[indexCuentaActual].nombre,
        monto: parseFloat(this.amount),
        fecha: this.fecha,
        categoria: 'Transferencia' }
      if (this.obtenerSaldo() - nuevoEgreso.monto < 0) {
        alert('El Saldo no es suficiente. Ingrese una catidad correcta.')
      } else {
        egresosCuentaActual.push(nuevoEgreso)
        ingresosCuentaAenviar.push(nuevoIngreso)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.divisor {
  margin-top: 200px;
}

</style>
