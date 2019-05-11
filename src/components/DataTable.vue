<template>
  <div class="hello">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons">
    <v-toolbar flat color="white">
      <v-toolbar-title>{{obtenerNombreCuenta()}}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>

<!--
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>-->
          
          <!--Aqui va lo que Alan hizo-->

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.ntrans }}</td>
        <td class="text-xs-right">{{ props.item.descripcion }}</td>
        <td class="text-xs-right">{{ props.item.monto }}</td>
        <td class="text-xs-right">{{ props.item.fecha }}</td>
        <td class="text-xs-right">{{ props.item.categoria }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
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
        text: "Número de transacción",
        align: "left",
        sortable: false,
        value: "ntrans"
      },
      { text: "Descripción", value: "descripcion" },
      { text: "Monto", value: "monto" },
      { text: "Fecha", value: "fecha" },
      { text: "Categoría", value: "categoria" },
      { text: "Acciones", value: "name", sortable: false }
    ]
  }),

  computed: {
    cuentas(){
      return this.$store.state.CUENTAS
    },
    cuentaActual(){
      return this.$store.state.CUENTA_ACTUAL
    },  
    tipoTransaccion(){
      return this.$sotre.state.TIPO_TRANSACCION
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    obtenerNombreCuenta(cuentaActual){
      var idCuentaActual =  this.cuentaActual
      let cuenta1 = this.cuentas.find(cuenta => cuenta.id === idCuentaActual)
      return cuenta1 == undefined ? "Seleccionar Cuenta": cuenta1.nombre + ".  Saldo: " + this.obtenerSaldo()  + "Bs"

    },

//Transaccion = {Descripcion: , Monto: , Fecha: , Categoria: }
    obtenerSaldo(){
      let idCuentaActual =  this.cuentaActual
      let cuenta1 = this.cuentas.find(cuenta => cuenta.id === idCuentaActual)
      let listaIngresos = cuenta1.ingresos
      let listaEgresos = cuenta1.egresos
      let ingresosTotales = 0
      let egresosTotales = 0

      listaIngresos.forEach(transaccion => {
        ingresosTotales +=   transaccion.monto
      });
      listaEgresos.forEach(transaccion =>{
        egresosTotales += transaccion.monto
      })

      return (ingresosTotales - egresosTotales)
    }
  },
  name: "DataTable"
};
</script>

<style scoped>

</style>
