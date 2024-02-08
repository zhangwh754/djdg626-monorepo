const directive = (function () {
  return {
    'v-text': function (node: HTMLElement, value: any) {
      node.textContent = value
    },
  }
})()

export class Compiler {
  vm: Object
  el: HTMLElement
  data: { [key: string]: any }
  methods: { [key: string]: Function }

  constructor(vm: Object, el: HTMLElement, data: Object, methods: { [key: string]: Function }) {
    this.vm = vm
    this.el = el
    this.data = data
    this.methods = methods

    this.compile(el)
  }

  compile(el: HTMLElement | ChildNode) {
    if (!el.childNodes || el.childNodes.length === 0) return

    Array.from(el.childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElementNode(node as HTMLElement)
      } else if (this.isTextNode(node)) {
        this.compileTextNode(node)
      }

      // 嵌套元素节点 进行递归
      this.compile(node)
    })
  }

  compileElementNode(node: HTMLElement) {
    Array.from(node.attributes).forEach(attribute => {
      const name = attribute.name.split('')

      if (name.shift() === ':') {
        const newName = name.join('')

        node.setAttribute(newName, this.data[attribute.value])
      } else if (attribute.name.startsWith('@')) {
        const newName = name.join('')

        node.addEventListener(newName, (...args) => {
          this.methods[attribute.value].apply(this.vm, args)
        })
      }

      if (attribute.name.startsWith('v-')) {
        directive[attribute.name as keyof typeof directive]?.(node, attribute.value)
      }
    })
  }

  compileTextNode(node: ChildNode) {
    const regExp = /\{\{(.+?)\}\}/g

    const matchResult = node.textContent?.match(regExp)

    if (matchResult) {
      matchResult.forEach(mustache => {
        const key = regExp.exec(node.textContent!)?.[1]!

        node.textContent = node.textContent?.replace(mustache, this.data[key])!
      })
    }
  }

  isElementNode(node: ChildNode) {
    return node.nodeType === 1
  }

  isTextNode(node: ChildNode) {
    return node.nodeType === 3
  }
}
