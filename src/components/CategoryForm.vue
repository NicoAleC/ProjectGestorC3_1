<template>
   <div>
     <transition name="modal">
      <div v-if="isOpen">

          <CategoryList></CategoryList>

      </div>
     </transition>
      <button @click="isOpen=!isOpen">Register Income/Expense</button>
   </div>
</template>


<script>
import CategoryList from '@/components/CategoryList.vue'
   export default{
     components:{
       CategoryList: CategoryList
     },
       data:function(){
          return {
      isOpen: false
    }
       }
   }
</script>