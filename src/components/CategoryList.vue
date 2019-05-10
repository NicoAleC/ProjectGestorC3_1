<template>
<div class = "UICategory">
  <div class="categoryList">
      <Category
      v-bind:id="category.id"
      v-for="category in categoryIncome"
      :key="category.id"
      ></Category>
  </div>
      <button class = "button" @click="addCategory"> <span>Add Category</span></button>
</div>


</template>

<script>
import Category from '@/components/Category.vue'
export default {
  name: 'CategoryList',
  components:{
    Category: Category
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

    addCategory(){
      
    },
  }
}
</script>