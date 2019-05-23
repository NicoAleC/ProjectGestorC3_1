<template>
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <CategoryList></CategoryList>
      </div>
     </transition>
      <v-btn outline color="#ffffff" class="button" @click="isOpen=!isOpen">EDITAR CATEGORIAS</v-btn>
   </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
export default {
  components: {
    CategoryList: CategoryList
  },
  data: function() {
    return {
      isOpen: false
    }
  }
}
</script>
<style scoped>
.button {
  padding: 0;
  border: none;
  background: none;
  position: relative;
  left: 0;
  bottom: 0;
  font-family: inherit;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #3c3c3c;
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s;
  font-size: 12px;
}
</style>
