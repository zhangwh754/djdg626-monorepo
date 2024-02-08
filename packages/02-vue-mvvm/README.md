# vue-mvvm

简单实现vue-mvvm数据双向绑定

```html
<div id="app">
  <input type="text" v-model="word">
  <p>{{word}}</p>
  <button v-on:click="sayHi">change model</button>
</div>
```

```js
import { Mvvm } from "@djdg626/vue-mvvm";
const vm = new Mvvm({
  el: "#app",
  data: {
    msg: "Hello World",
  },
});
```

## 进度

- [x] vm实例绑定el,data,methods
- [x] 劫持data数据到vm实例上
- [x] 编译mustache语法
- [x] 编译v-开头的vue指令（完成了v-text）
- [x] 绑定methods事件（@click="customEventName"）
- [x] 给data的数据添加响应式处理