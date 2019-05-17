<template>
<div class = "UICategoria">
  <div class="listaCategoria">
      <Category
        v-bind:id= "categoria.id"
        v-for="categoria in escogerTransaccion()"
        v-bind:nombre= "categoria.nombre"
        :key= "categoria.id"
      ></Category>
  </div>

      <button class = "button" @click="anadirCategoria"> <span>AÑADIR CATEGORIA</span></button>
</div>

</template>

<script>
import Category from '@/components/Category.vue'
export default {
  name: 'ListaCategoria',
  components: {
    Category: Category
  },
  computed: {
    categoriaIngresos() {
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoriaEgresos() {
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    transaccionActual() {
      return this.$store.state.TIPO_TRANSACCION
    }
  },
  methods: {

    anadirCategoria() {
      const codigo = Math.random().toString(36).substring(2, 15)
      const nuevaCategoria = { id: codigo,
        nombre: 'Categoria ' + codigo }

      if (this.transaccionActual === 'Ingresos') {
        this.$store.dispatch('anadirCategoriaIngreso', nuevaCategoria)
      } else {
        this.$store.dispatch('anadirCategoriaEgreso', nuevaCategoria)
      }
    },
    escogerTransaccion() {
      return this.transaccionActual === 'Ingresos' ? this.categoriaIngresos : this.categoriaEgresos
    }

  }
}
</script>
<style scoped>
body {
 width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: 'Open Sans Condensed', sans-serif;
}
.UICategoria{
  position:relative;
  background-color: #3C3C3C;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 30px;
  width: 100%;

}
.listaCategoria{
  overflow: scroll;
  height: 300px;
}
.button{
  padding: 0;
  border: none;
  background: none;
  position: absolute;
  left:    0;
  bottom:   0;
  font-family : inherit;
  padding-left: 94px;
  padding-right: 94px;
  background-color: #3C3C3C;
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  color: #FFF;
  transition: all 0.3s;
}
.button span {
  transition: all 0.3s;
}
.button::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: all 0.3s;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-style: solid;
  border-bottom-style: solid;
  border-top-color: rgba(255,255,255,0.5);
  border-bottom-color: rgba(255,255,255,0.5);
  transform: scale(0.1, 1);
}
.button:hover span {
  letter-spacing: 2px;
}
.button:hover::before {
  opacity: 1;
  transform: scale(1, 1);
}
.button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.3s;
  background-color: rgba(255,255,255,0.1);
}
.button:hover::after {
  opacity: 0;
  transform: scale(0.1, 1);
}
</style>
