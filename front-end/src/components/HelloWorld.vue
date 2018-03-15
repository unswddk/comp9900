<template>
  <div class="hello" >
      <ul>
        <li
      is="todo-item"
      v-for="todo in todos"
      v-bind:key="todo.id"
          ></li>
  </ul>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Vue from 'vue'
Vue.component('todo-item', {
  template: `<div class='card'></div>`
})
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Comp9900',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        },
        {
          id: 4,
          title: 'Mow the lawn'
        },
        {
          id: 5,
          title: 'Mow the lawn'
        },
        {
          id: 6,
          title: 'Mow the lawn'
        },
        {
          id: 7,
          title: 'Mow the lawn'
        },
        {
          id: 8,
          title: 'Mow the lawn'
        },
        {
          id: 9,
          title: 'Mow the lawn'
        }
      ]
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card{
  position:relative;
  width: 30%;
  height: 200px;
  margin-top: 10px;
  display: inline-block;
  margin-left: 8px;
  left: 4%;
}
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    border-top: rgb(145, 11, 138) solid 1px;
}
/* Add some padding ixnside the card container */
.container {
    padding: 2px 16px;
}
</style>
