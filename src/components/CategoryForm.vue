<template>
   <div>
     <transition name="modal">
      <div v-if="isOpen">

          <CategoryList></CategoryList>

      </div>
     </transition>
      <button class="button" @click="isOpen=!isOpen">EDITAR CATEGORIAS</button>
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
<style scoped>
.button{
  padding: 0;
  border: none;
  background: none;
  position: relative;
  left:    0;
  bottom:   0;
  font-family : inherit;
  padding-left: 94px;
  padding-right:94px;
  background-color: #3C3C3C;
  line-height: 50px;
	height: 50px;
	text-align: center;
	width: 100%;
	cursor: pointer;
  color: #FFF;
	transition: all 0.3s;
}
</style>