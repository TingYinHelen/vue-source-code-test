new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
  },
  watch: {
    message(val){
      console.log(val)
    }
  },
  methods: {
    test(){
      this.message = 'Helen'
    }
  }
})