import { Mvvm } from '@djdg626/vue-mvvm'

const vm = new Mvvm({
  el: '#app',
  data: {
    msg: 'Hello World',
    msg2: '你好世界',
    count: 0,
  },
  methods: {
    sayHi() {
      console.log('this.msg', this.msg)
    },

    addCount() {
      this.count += 1

      console.log('this.count', this.count)
    },
  },
})

console.log(vm.msg)
