import { Deps } from './Deps'

export class Observers {
  constructor(data: Object) {
    this.walk(data)
  }

  walk(data: Object) {
    if (typeof data !== 'object') return

    Object.keys(data).forEach(key => {
      // 把自己变为响应式对象
      this.defineReactive(data, key, data[key as keyof typeof data])

      // 对可能的嵌套的引用类型也做响应式处理
      this.walk(data[key as keyof typeof data])
    })
  }

  defineReactive(data: Object, key: string, value: any) {
    const deps = new Deps()

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        Deps.target && deps.addSubs(Deps.target)

        return value
      },
      set(newValue) {
        value = newValue

        deps.notify(newValue)
      },
    })
  }
}
