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
            <v-layout wrap>
              <v-flex xsOffset6 xs6>
                <v-text-field disabled="" label="Saldo" single-line="" outline></v-text-field>
              </v-flex>
              </v-layout>
          </v-container>
          <small>Elija la cuenta a transferir y la cantidad:</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="savetransfer">Transferir</v-btn>
        </v-card-actions>
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
    cuentas () {
      return this.$store.state.CUENTAS
    },
    cuentaactual () {
      return this.$store.state.CUENTA_ACTUAL
    }
  },
  methods: {
    savetransfer () {
      let cuentaenviar = this.cuentas.findIndex(cuenta => cuenta.id === this.selectedaccount[0])
      console.log(this.$store.state.CUENTAS[cuentaenviar].nombre)
      console.log(this.$store.state.CUENTAS[this.cuentaactual].nombre)
    }
  }
}
</script>
