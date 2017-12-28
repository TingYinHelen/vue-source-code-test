var Child = {
  template: '<div>child component</div>'
}
Vue.component('my-component', {
  name: 'my-component',
  template: '<div>A custom component!<Child></Child></div>',
  components: {
    Child: Child
  },
  created(){
    console.log(this)
  },
  mounted(){
    console.log(this)
  }
})


new Vue({
  el: '#app',
  data: {
    value: 2
  }
})