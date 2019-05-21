<template>
  <div class="interfazCuentas">
    <div class="listaCuentas">
      <Cuenta
        v-bind:id="cuenta.id"
        v-for="cuenta in cuentas"
        v-bind:nombre="cuenta.nombre"
        :key="cuenta.id"
      ></Cuenta>
    </div>
    <button class="button" @click="anadirCuenta">
      <span>AÑADIR</span>
    </button>
  </div>
</template>

<script>
import Cuenta from '@/components/Cuenta.vue'
export default {
  name: 'ListaCuentas',
  components: {
    Cuenta: Cuenta
  },
  computed: {
    cuentas() {
      return this.$store.state.CUENTAS
    },
    cuentaActual() {
      return this.$store.state.CUENTA_ACTUAL
    }
  },
  methods: {
    anadirCuenta() {
      const codigo = Math.random()
          .toString(36)
          .substring(2, 15)
      const nuevaCuenta = {
        id: codigo,
        nombre: 'Cuenta ' + codigo,
        ingresos: [],
        egresos: []
      }

      this.$store.dispatch('anadirCuenta', nuevaCuenta)
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
  font-family: "Open Sans Condensed", sans-serif;
}

.interfazCuentas {
  position: relative;
  background-color: #3c3c3c;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 30px;
  width: 300px;
}
.listaCuentas {
  overflow: scroll;
  height: 500px;
}
.button {
  padding: 0;
  border: none;
  background: none;
  position: absolute;
  left: 0;
  bottom: 0;
  font-family: inherit;
  padding-left: 94px;
  padding-right: 94px;
  background-color: #3c3c3c;
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
}
.button span {
  transition: all 0.3s;
}
.button::before {
  content: "";
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
  border-top-color: rgba(255, 255, 255, 0.5);
  border-bottom-color: rgba(255, 255, 255, 0.5);
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
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.1);
}
.button:hover::after {
  opacity: 0;
  transform: scale(0.1, 1);
}
</style>
