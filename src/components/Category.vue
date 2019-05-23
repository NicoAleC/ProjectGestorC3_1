<template>
  <div class="categoria">
    <form class="formulario" action>
      <input
        class="input"
        :id="id"
        ref="nombreCategoria"
        type="text"
        name="nombreCategoria"
        :value="nombre"
      >
    </form>
    <button class="button" id="botonEditar" type="button" v-on:click="editarCategoria">
      <span>{{nombreBoton}}</span>
    </button>
    <button class="button" id="botonBorrar" type="button" v-on:click="borrarCategoria">
      <span>Eliminar</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'categoria',
  props: ['id', 'nombre'],
  data() {
    return {
      nombreBoton: 'Guardar'
    }
  },

  computed: {
    categoriaIngresos() {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriaEgresos() {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    tipoTransaccion() {
      return this.$store.state.TIPO_TRANSACCION
    }
  },
  methods: {
    editarCategoria() {
      const idCategoria = this.id
      if (this.nombreBoton === 'Editar') {
        document.getElementById(idCategoria).disabled = false
        this.nombreBoton = 'Guardar'
      } else {
        const nombreActual = document.getElementById(idCategoria).value
        if (
          nombreActual === '' ||
          this.nombreRepetido(nombreActual, idCategoria)
        ) {
          console('Nombre inválido')
        } else {
          document.getElementById(this.id).disabled = true
          this.nombreBoton = 'Editar'
          let indexCategoria
          let datosCategoria
          if (this.tipoTransaccion === 'Ingresos') {
            indexCategoria = this.categoriaIngresos.findIndex((categoria) => categoria.id === idCategoria)
            datosCategoria = { indexCategoria: indexCategoria, nombreActual: nombreActual }
            this.$store.dispatch('editarCategoriaIngresos', datosCategoria)
          } else {
            indexCategoria = this.categoriaEgresos.findIndex((categoria) => categoria.id === idCategoria)
            datosCategoria = { indexCategoria: indexCategoria, nombreActual: nombreActual }
            this.$store.dispatch('editarCategoriaEgresos', datosCategoria)
          }
        }
      }
    },

    borrarCategoria: function() {
      const idCategoria = this.id
      let indexCategoria
      if (this.tipoTransaccion === 'Ingresos') {
        indexCategoria = this.categoriaIngresos.findIndex((categoria) => categoria.id === idCategoria)
        this.categoriaIngresos.splice(indexCategoria, 1)
      } else {
        indexCategoria = this.categoriaEgresos.findIndex((categoria) => categoria.id === idCategoria)
        this.categoriaEgresos.splice(indexCategoria, 1)
      }
    },
    nombreRepetido(nombreActual, idCategoria) {
      if (this.tipoTransaccion === 'ingresos') {
        return !!this.categoriaIngresos.find(
            (categoria) =>
              categoria.nombre === nombreActual && categoria.id !== idCategoria
        )
      } else {
        return !!this.categoriaEgresos.find(
            (categoria) =>
              categoria.nombre === nombreActual && categoria.id !== idCategoria
        )
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.input {
  border: none;
  background: none;
  background-color: #f5f5f5;
  width: 150px;
  height: 40px;
  padding-top: 10px;
  top: 0;
  float: left;
  padding-bottom: 10px;
}
.formulario {
  float: left;
  width: 40%;
}
.categoria {
  width: 100%;
  height: 50px;
  position: relative;
}
.categoria::after {
  content: "";
  clear: both;
  display: table;
}
.button {
  top: 0;
  padding: 0;
  border: none;
  background: none;
  margin-right: 0px;
  position: absolute;
  border-style: solid;
  border-color: #3c3c3c;
  border-right-width: 1px;
  float: left;
  width: 30%;
  height: 40px;
  font-family: inherit;
  background-color: #3c3c3c;
  color: #fff;
  transition: all 0.5s;
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
}
.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}
.button:hover::before {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
.button::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transform: scale(1.2, 1.2);
}
.button:hover::after {
  opacity: 1;
  transform: scale(1, 1);
}
</style>
