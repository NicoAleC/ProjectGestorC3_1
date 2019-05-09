<template>
   <div>
     <transition name="modal">
      <div v-if="isOpen">
         
          <p>
            <label for="Name">Name:</label>
            <input id="Name" v-model="name" placeholder="Name">
          </p>

          <p>
            <label for="Category">Category:</label>
            <input id="Category" v-model="category" placeholder="Category">
          </p>

          <p>
            <label for="Ammount">Ammount:</label>
            <input id="Ammount" v-model="ammount" placeholder="Ammount">
          </p>

      </div>
     </transition>
      <button @click="isOpen=!isOpen">Register Income/Expense</button>
   </div>
</template>


<script>
   export default{
       data:function(){
          return {
      isOpen: false
    }
       }
   }
</script>