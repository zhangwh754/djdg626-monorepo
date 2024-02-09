import { Sub } from './Sub'
export class Deps {
  deps: Sub[]

  constructor() {
    this.deps = []
  }

  addSubs(sub: Sub) {
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
