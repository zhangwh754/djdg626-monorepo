import { Mvvm } from '@djdg626/vue-mvvm'

const vm = new Mvvm({
  el: '#app',
  data: {
    msg: 'Hello World',
    msg2: '你好世界',
    count: 0,

    obj: {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    },
  },
  methods: {
    sayHi() {
      const res = this.msg === 'Hello World' ? '你好世界' : 'Hello World'
      this.msg = res
    },

    addCount() {
      this.count += 1

      console.log('this.count', this.count)
    },
  },
})

// console.log(vm.obj.b.c)
// vm.obj.b.c = 100
// console.log(vm.obj.b.c)
