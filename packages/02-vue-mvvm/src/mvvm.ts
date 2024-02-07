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
  }
}
