<template>
  <div class="home">
    <Home msg="Welcome to Your Vue.js App"/>
    <ModalComponent/>
    <!--<IncomeExpense/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import ModalComponent from '@/components/ModalComponent.vue'

export default {
  name: 'home',
  components: {
    Home,
    ModalComponent
  }
}
</script>
