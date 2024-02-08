import { Sub } from './Sub'

const directive = (function () {
  return {
    'v-text': function (node: HTMLElement, value: any) {
      node.textContent = value
    },
    'v-model': function (node: HTMLElement, key: string, data: Object) {
      ;(node as any).value = data[key as keyof typeof data]

      node.addEventListener('input', ((event:Event) => {
        event.preventDefault()
        const newValue = (event.target as HTMLInputElement).value

        data[key as keyof typeof data] = newValue as any
      }))

      new Sub(data, key, (newValue: any) => {
        ;(node as any).value = newValue
      })
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

        new Sub(this.data, attribute.value, (newValue: any) => {
          node.setAttribute(newName, newValue)
        })
      } else if (attribute.name.startsWith('@')) {
        const newName = name.join('')

        node.addEventListener(newName, (...args) => {
          this.methods[attribute.value].apply(this.vm, args)
        })
      }

      if (attribute.name.startsWith('v-')) {
        directive[attribute.name as keyof typeof directive]?.(node, attribute.value, this.data)
      }
    })
  }

  compileTextNode(node: ChildNode) {
    const regExp = /\{\{(.+?)\}\}/g

    const rawTextContent = node.textContent
    const matchResult = node.textContent?.match(regExp)

    if (matchResult) {
      matchResult.forEach(mustache => {
        const key = regExp.exec(node.textContent!)?.[1].trim()!

        node.textContent = node.textContent?.replace(mustache, this.data[key])!

        new Sub(this.data, key, (newValue: any) => {
          node.textContent = rawTextContent?.replace(mustache, newValue)!
        })
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
