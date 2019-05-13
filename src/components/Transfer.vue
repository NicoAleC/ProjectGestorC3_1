<template>
<v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Transferir</v-btn>
      </template>
      <v-card>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveTransfer">Transferir</v-btn>
        </v-card-actions>\
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
      egresosCuentaActual.push(nuevoEgreso)

      // ingreso a la cuentaAenviar

      var cuentaAenviar = this.cuentas[indexCuentaAenviar]
      var ingresosCuentaAenviar = cuentaAenviar.ingresos

      var nuevoIngreso = { ntrans: Math.random().toString(36).substring(2, 15),
        descripcion: 'Transferencia de' + this.cuentas[indexCuentaActual].nombre,
        monto: parseFloat(this.amount),
        fecha: this.fecha,
        categoria: 'Transferencia' }
      ingresosCuentaAenviar.push(nuevoIngreso)
      this.close()
    }
  }
}
</script>
