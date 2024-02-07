import { Mvvm } from '@djdg626/vue-mvvm'

const vm = new Mvvm({
  el: '#app',
  data: {
    msg: 'Hello World',
  },
})

console.log('vm', vm.msg)
vm.msg = '你好世界'
console.log('vm', vm.msg)
