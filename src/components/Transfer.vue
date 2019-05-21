<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn outline="" color="#ffffff" v-on="on">Transferir</v-btn>
      </template>
      <v-card>
        <v-responsive :height="500">
          <v-card-title>
            <span class="headline">Transferencia</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
              <v-flex xs12 sm6>
                <v-select
                  :items="sinactual"
                  item-text = "nombre"
                  item-value = "id"
                  v-model= "selectedaccount"
                  label="Cuenta"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Cantidad" required
                  v-model= "amount"
                  type="number"
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
          <v-btn outline color= #3C3C3C @click="dialog = false">Close</v-btn>
          <v-btn outline="" color= #3C3C3C @click="saveTransfer">Transferir</v-btn>
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
    amount: null
  }),
  computed: {
    cuentas() {
      return this.$store.state.CUENTAS
    },
    cuentaActual() {
      return this.$store.state.CUENTA_ACTUAL
    },
    sinactual() {
      const cuentasin = JSON.parse(JSON.stringify(this.$store.state.CUENTAS))
      const pos = cuentasin.map(function(e) {return e.id}).indexOf(this.$store.state.CUENTA_ACTUAL)
      cuentasin.splice(pos, 1)
      return cuentasin
    },
    fecha() {
      const myDate = new Date()
      const month = ('0' + (myDate.getMonth() + 1)).slice(-2)
      const date = ('0' + myDate.getDate()).slice(-2)
      const year = myDate.getFullYear()
      const formattedDate = year + '/' + month + '/' + date
      return formattedDate
    }
  },
  methods: {
    close() {
      this.dialog = false
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
    },
    definirEgreso() {
      const indexCuentaActual = this.cuentas.findIndex((cuenta) => cuenta.id === this.cuentaActual)
      const cuentaActual = this.cuentas[indexCuentaActual]
      const egresosCuentaActual = cuentaActual.egresos

      const nuevoEgreso = { ntrans: Math.random().toString(36).substring(2, 15),
        descripcion: 'Transferencia a' + this.cuentas[indexCuentaAenviar].nombre,
        monto: parseFloat(this.amount),
        fecha: this.fecha,
        categoria: 'Transferencia'
      }
      return nuevoEgreso
    },
    definirIngreso() {
      const cuentaAenviar = this.cuentas[indexCuentaAenviar]
      const ingresosCuentaAenviar = cuentaAenviar.ingresos

      const nuevoIngreso = { ntrans: Math.random().toString(36).substring(2, 15),
        descripcion: 'Transferencia de' + this.cuentas[indexCuentaActual].nombre,
        monto: parseFloat(this.amount),
        fecha: this.fecha,
        categoria: 'Transferencia' }
      return nuevoIngreso
    },
    saveTransfer() {
      const indexCuentaAenviar = this.cuentas.findIndex(
          (cuenta) => cuenta.id === this.selectedaccount
      )

      const nuevoEgreso = this.definirEgreso()

      const nuevoIngreso = this.definirIngreso()

      if (this.obtenerSaldo() - nuevoEgreso.monto < 0 || nuevoEgreso.monto < 0) {
        alert('El Saldo no es suficiente. Ingrese una catidad correcta.')
      } else {
        datosTransferencia = { nuevoEgreso: nuevoEgreso,
          nuevoIngreso: nuevoIngreso,
          egresosCuentaActual: egresosCuentaActual,
          ingresosCuentaAenviar: ingresosCuentaAenviar }
        this.$store.dispatch('registrarTransferencia', datosTransferencia)
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
