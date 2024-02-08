# vue-mvvm

简单实现vue-mvvm数据双向绑定

```html
<div id="app">
  <input class="input input-border input-primary" type="text" :value="count">
  <input class="input input-border input-primary" type="text" v-model="count">
  <hr />

  <div>current count： {{   count}}</div>
  <hr />

  <div v-text="啦啦啦">被覆盖</div>
  <hr />

  <p>
    第一个：{{msg}}
    <hr />
    第二个：{{msg2}}
  </p>
  <hr />

  <button class="btn btn-success" @click="sayHi">success</button>
  <button class="btn btn-primary" @click="addCount">addCount</button>
</div>
```

```js
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
```

## 进度

- [x] vm实例绑定el,data,methods
- [x] 劫持data数据到vm实例上
- [x] 编译mustache语法
- [x] 编译v-开头的vue指令（完成了v-text）
- [x] 绑定methods事件（@click="customEventName"）
- [x] 给data的数据添加响应式处理
- [x] 响应式数据双向绑定（第一层的基本数据类型完成）