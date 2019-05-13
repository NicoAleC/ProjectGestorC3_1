<template>
  <div class= "escogerTransferencia">
    <button  class = "button" id = "irAIngresos" type = "button" v-on:click = "irAIngresos">
      <span>INGRESOS</span>
    </button>
    <button  class = "button" id = "irAEgresos" type = "button" v-on:click = "irAEgresos">
      <span>EGRESOS</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'transaccion',
  props: ['id', 'name'],
  data () {
    return {
    }
  },
  computed: {
    tipoTransaccion () {
      return this.$store.state.TIPO_TRANSACCION
    }
  },
  methods: {

    irAIngresos () {
      let tipo = 'Ingresos'
      this.$store.dispatch('changeTransaction', tipo)
    },
    irAEgresos () {
      let tipo = 'Egresos'
      this.$store.dispatch('changeTransaction', tipo)
    }

  }
}
</script>

<style scoped>
.escogerTransferencia{
  height:25%;
}
  .button {
    margin-right: 0px;
    position: relative;
    border-style: solid;
    border-color: #3C3C3C;
    border-right-width: 1px;
    float: left;
    width: 50%;
    height: 100%;
    font-family : inherit;
    background-color: #3C3C3C;
    color: #FFF;
    transition: all 0.5s;
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px;
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
