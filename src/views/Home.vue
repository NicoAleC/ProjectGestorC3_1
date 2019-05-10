<template>
  <div class="home">
    <Home msg="Welcome to Your Vue.js App"/>
    <CategoryForm/>
    <!--<IncomeExpense/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'
import CategoryForm from '@/components/CategoryForm.vue'

export default {
  name: 'home',
  components: {
    Home,
    CategoryForm
  }
}
</script>
