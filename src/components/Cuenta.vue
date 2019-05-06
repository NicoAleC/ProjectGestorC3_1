<template>
  <div :class= "cuenta">
    <form action="">
      <input id = "inputNombre" type="text" name = "nombreCuenta" :value = nombre>
    </form>
    <button id = "btnEditar" type = "button" v-on:click = "editarNombre">{{nombreBoton}}</button>
    <button id = "btnEliminar" type = "button">Eliminar</button>
  </div>
</template>

<script>
export default {
  name: 'cuenta',
  props: ['nombre','ingresos','egresos'],
  data() {
    return{
    nombreBoton: "Guardar"
    }  
  },

  methods:{

    editarNombre: function(){

      if(this.nombreBoton == "Editar"){
        document.getElementById("inputNombre").disabled = false//Habilitar la edicion en el input
        this.nombreBoton = "Guardar"//Cambiar el nombre del boton
      }else{
        this.nombre = document.getElementById("inputNombre").value//Cambiar el nombre de la cuenta
        document.getElementById("inputNombre").disabled = true//Deshabilitar la edicion en el input
        this.nombreBoton = "Editar"//Cambiar el nombre del boton

      }     
    },

    eliminarCuenta: function(){
      "TODO"
    }
    
  }
 
}
</script>

<style scoped>
  
  #inputNombreC{  
    float: left;
    clear: left
  }

  #btnEliminar{
    float: right;
    clear:right
  }
</style>
