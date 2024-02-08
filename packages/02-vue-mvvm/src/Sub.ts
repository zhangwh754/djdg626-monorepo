import { Deps } from './Deps'

export class Sub {
  callback: Function
  oldValue: any

  constructor(data: Object, key: String, callback: Function) {
    this.callback = callback

    // 把自身指向Deps.target
    Deps.target = this

    // 读取一次自身触发get，添加到Deps的subs内
    data[key as keyof typeof data]

    // 避免重复添加
    Deps.target = null
  }

  update(newValue: any) {
    this.callback(newValue)
  }
}
