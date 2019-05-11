<template>
  <div class= "category">
    <form class= "form" action="">
      <input class = "input" :id= "id" ref="categoryName"  type="text" name = "categoryName" :value = nombre>
    </form>
    <button class = "button" id = "buttonEdit" type = "button" v-on:click = "editCategory">  <span>{{buttonName}}</span>
</button>
    <button class = "button" id = "buttonDelete" type = "button" v-on:click = "deleteCategory">  <span>Eliminar</span>
</button>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['id','nombre'],
  data() {
    return{
    buttonName: "Guardar",
    }  
  },

  computed: {
    categoryIncomes(){
      return this.$store.state.CATEGORIAS_INGRESOS
    },
    categoryExpenses(){
      return this.$store.state.CATEGORIAS_EGRESOS
    },
    tipoTransaccion(){
      return this.$store.state.TIPO_TRANSACCION
    }
  },
  methods:{

    editCategory(){
      var idCategoria = this.id
      if(this.buttonName == "Editar"){
        document.getElementById(idCategoria).disabled = false
        this.buttonName = "Guardar"
      }else{
        var nombreActual = document.getElementById(idCategoria).value
        if(nombreActual == "" || this.nombreRepetido(nombreActual,idCategoria)){
          console("Nombre inválido")
        }else{
          document.getElementById(this.id).disabled = true
          this.buttonName = "Editar"
          let indexCategoria
          if(this.tipoTransaccion == 'Ingresos'){
            indexCategoria = this.categoryIncomes.findIndex(categoria => categoria.id === idCategoria)
            this.categoryIncomes[indexCategoria].nombre = nombreActual
          }else{
            indexCategoria = this.categoryExpenses.findIndex(categoria => categoria.id === idCategoria)
            this.categoryExpenses[indexCategoria].nombre = nombreActual
          }

        }
      }
    },

    deleteCategory: function(){
      var idCategoria = this.id
      let categoria
      if(this.tipoTransaccion == "Ingresos"){
        categoria = this.categoryIncomes.find(categoria => categoria.id === idCategoria)
        this.categoryIncomes.splice(categoria,1)
       
      }else{
        categoria = this.categoryExpenses.find(categoria => categoria.id === idCategoria)
        this.categoryExpenses.splice(categoria,1)

      }   

    },
    nombreRepetido(nombreActual,idCategoria){
      if(this.tipoTransaccion == "ingresos"){
        return  this.categoryIncomes.find(categoria => categoria.nombre === nombreActual 
                                          && categoria.id != idCategoria) ? true : false
      }else{
        return  this.categoryExpenses.find(categoria => categoria.nombre === nombreActual 
                                          && categoria.id != idCategoria) ? true : false
      }

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