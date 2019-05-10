<template>
  <div class= "category" v-on:click= "selectCategory">
    <form class= "form" action="">
      <input class = "input" :id= "id" ref="categoryName"  type="text" name = "categoryName" :value = nombre>
    </form>
    <button class = "button" id = "buttonEdit" type = "button" v-on:click = "editName">  <span>{{nombreBoton}}</span>
</button>
    <button class = "button" id = "buttonDelete" type = "button" v-on:click = "deleteCategory">  <span>Delete</span>
</button>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['id','name'],

  data() {
    return{
    nombreBoton: "Save Category",
    }  
  },
  computed: {
    categoryIncome(){
      return this.$store.state.CATEGORIAS_INGRESOS;
    },
    categoryExpense(){
      return this.$store.state.CATEGORIAS_EGRESOS;
    }
  },
  methods:{

    editarNombre: function(){

      var idCuenta = this.id
      if(this.nombreBoton == "Editar"){
        //this.$refs.accountName
        document.getElementById(idCuenta).disabled = false//Habilitar la edicion en el input
        this.nombreBoton = "Guardar"//Cambiar el nombre del boton

      }else{//Guardar la edicion
        var nombreActual = document.getElementById(idCuenta).value
        if(nombreActual == "" || this.nombreRepetido(nombreActual,idCuenta)){
          console.log("Nombre inválido")//Mostrar ventana de error
        }else{

          document.getElementById(this.id).disabled = true//Deshabilitar la edicion en el input
          this.nombreBoton = "Editar"//Cambiar el nombre del boton
          let indexCuenta = this.cuentas.findIndex(cuenta => cuenta.id === idCuenta)
          this.cuentas[indexCuenta].nombre = nombreActual
        }
      }     
    },

    eliminarCuenta(){
      var idCuenta = this.id
      let cuenta = this.cuentas.find(cuenta => cuenta.id === idCuenta)
      this.cuentas.splice(cuenta,1)
    },

    seleccionarCuenta(){
      "TODO"
    },

    nombreRepetido(nombreActual,idCuenta){
      return  this.cuentas.find(cuenta => cuenta.nombre === nombreActual && cuenta.id != idCuenta) ? true : false
    },    
  }
}
</script>
