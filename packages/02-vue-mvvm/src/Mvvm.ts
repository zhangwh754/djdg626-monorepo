import { Observers } from './Observers'
import { Compiler } from './Compiler'

type Options = {
  el: string
  data: Object
  methods: { [key: string]: Function }
}

export default class Mvvm {
  $options: Options
  $el: HTMLElement
  $data: Object
  $methods: { [key: string]: Function }

  constructor(options: Options) {
    this.$el = document.querySelector(options.el)!
    this.$options = options
    this.$data = options.data
    this.$methods = options.methods

    this._proxyData(options.data)

    new Observers(this.$data)
    new Compiler(this, this.$el, this.$data, this.$methods)
  }

  _proxyData(data: Object) {
    if (!data || typeof data !== 'object') {
      throw new Error('data需要传入一个对象')
    }

    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return this.$data[key]
        },
        set(newValue) {
          this.$data[key] = newValue
        },
      })
    })
  }
}
