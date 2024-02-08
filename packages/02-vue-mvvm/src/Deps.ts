import { Sub } from './Sub'

type ISub = {
  update: Function
  [key: string]: any
}

export class Deps {
  deps: ISub[]

  constructor() {
    this.deps = []
  }

  addSubs(sub: ISub) {
    if (sub && typeof sub.update === 'function') {
      this.deps.push(sub)
    }
  }

  notify(newValue: any) {
    this.deps.forEach(dep => {
      dep.update(newValue)
    })
  }

  static target: null | Sub
}
