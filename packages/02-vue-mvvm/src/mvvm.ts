type Options = {
  el: string
  data: Object
}

export default class Mvvm {
  $options: Options
  $el: HTMLElement
  $data: Object

  constructor(options: Options) {
    this.$el = document.querySelector(options.el)!
    this.$options = options
    this.$data = options.data

    this._proxyData(options.data)
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
