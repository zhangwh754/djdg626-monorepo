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