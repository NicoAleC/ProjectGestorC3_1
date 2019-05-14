<template>
  <div class= "cuenta">
    <form class= "form" action="">
      <input class = "input" :id= "id" ref="accountName" v-on:click = "seleccionarCuenta"  type="text" name = "nombreCuenta" :value = nombre>
    </form>
    <button class = "button" id = "btnEditar" type = "button" v-on:click = "editarNombre">  <span>{{nombreBoton}}</span>
</button>
    <button class = "button" id = "btnEliminar" type = "button" v-on:click = "eliminarCuenta">  <span>Eliminar</span>
</button>
  </div>
</template>

<script>
export default {
  name: 'cuenta',
  props: ['id', 'nombre', 'ingresos', 'egresos'],

  data () {
    return {
      nombreBoton: 'Guardar',
    }
  },
  computed: {

    cuentas () {
      return this.$store.state.CUENTAS
    },
    cuentaActual () {
      return this.$store.state.CUENTA_ACTUAL
    }

  },
  methods: {

    editarNombre: function () {
      var idCuenta = this.id
      if (this.nombreBoton === 'Editar') {
        // this.$refs.accountName
        document.getElementById(idCuenta).disabled = false// Habilitar la edicion en el input
        this.nombreBoton = 'Guardar'// Cambiar el nombre del boton
      } else { // Guardar la edicion
        var nombreActual = document.getElementById(idCuenta).value
        if (nombreActual === '' || this.nombreRepetido(nombreActual, idCuenta)) {
          console.log('Nombre inválido')// Mostrar ventana de error
        } else {
          document.getElementById(this.id).disabled = true// Deshabilitar la edicion en el input
          this.nombreBoton = 'Editar'// Cambiar el nombre del boton
          let indexCuenta = this.cuentas.findIndex(cuenta => cuenta.id === idCuenta)
          this.cuentas[indexCuenta].nombre = nombreActual
        }
      }
    },

    eliminarCuenta () {
      var idCuenta = this.id
      let cuenta = this.cuentas.find(cuenta => cuenta.id === idCuenta)
      this.cuentas.splice(cuenta, 1)
    },

    seleccionarCuenta () {
      var idAMandar = this.id
      this.$store.dispatch('cambiarCuentaActual', idAMandar)
    },

    nombreRepetido (nombreActual, idCuenta) {
      return !!this.cuentas.find(cuenta => cuenta.nombre === nombreActual && cuenta.id !== idCuenta)
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
  .input{
    border: none;
    background: none;
    background-color : #F5F5F5;
    width: 150px;
    height: 40px;
    padding-top: 10px;
    top: 0;
    float: left;
    padding-bottom: 10px
  }
  .form{
    float:left;
    width:40%;
  }
  .cuenta{
    width: 100%;
    height: 50px;
    position: relative;
  }
  .cuenta::after {
  content: "";
  clear: both;
  display: table;
}
  .button {
    top:  0;
    padding: 0;
    border: none;
    background: none;
    margin-right: 0px;
    position: absolute;
    border-style: solid;
    border-color: #3C3C3C;
    border-right-width: 1px;
    float: left;
    width: 30%;
    height: 40px;
    font-family : inherit;
    background-color: #3C3C3C;
    color: #FFF;
    transition: all 0.5s;
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px
}
.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255,255,255,0.1);
  transition: all 0.3s;
}
.button:hover::before {
  opacity: 0 ;
  transform: scale(0.5,0.5);
}
.button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.5);
  transform: scale(1.2,1.2);
}
.button:hover::after {
  opacity: 1;
  transform: scale(1,1);
}
</style>
