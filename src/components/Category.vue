<template>
  <div class= "category" v-on:click= "selectCategory">
    <form class= "form" action="">
      <input class = "input" :id= "id" ref="categoryName"  type="text" name = "categoryName" :value = name>
    </form>
    <button class = "button" id = "buttonEdit" type = "button" v-on:click = "saveCategory">  <span>{{buttonName}}</span>
</button>
    <button class = "button" id = "buttonDelete" type = "button" v-on:click = "deleteCategory">  <span>Delete</span>
</button>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['id','name'],

  data() {
    return{
    buttonName: "Save Category",
    }  
  },
  computed: {
    categoryIncomes(){
      return this.$store.state.CATEGORIAS_INGRESOS;
    },
    categoryExpenses(){
      return this.$store.state.CATEGORIAS_EGRESOS;
    }
  },
  methods:{
    saveCategory: function(){

    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
  .input{
    border: none;
    background: none;
    background-color : 	#F5F5F5; 
    width: 150px;
    height: 40px;
    padding-top: 10px;
    top: 0;
    float: left;
    padding-bottom: 10px
  }
  .form{
    float:left;
    width:40%;  
  }
  .category{
    width: 100%;
    height: 50px;
    position: relative;
  }
  .category::after {
  content: "";
  clear: both;
  display: table;
}
  .button {
  top:  0;
  padding: 0;
  border: none;
  background: none;
  margin-right: 0px;
  position: absolute;
  border-style: solid;
  border-color: #3C3C3C;
  border-right-width: 1px;
  float: left;
  width: 30%;
  height: 40px;
  font-family : inherit;
  background-color: #3C3C3C;
	color: #FFF;
	transition: all 0.5s;
	position: relative;
  padding-top: 10px;
  padding-bottom: 10px
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
