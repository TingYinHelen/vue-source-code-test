// actions.js
import shop from '../api/shop'

export const getAllProducts = ({ commit }) => {
  commit('REQUEST_PRODUCTS')
  shop.getProducts(products => {
    commit('RECEIVE_PRODUCTS', products)
  })
}
// actions.spec.js

// 使用 require 语法处理内联 loaders。
// inject-loader 返回一个允许我们注入 mock 依赖的模块工厂
import { expect } from 'chai'
const actionsInjector = require('inject-loader!./actions')

// 使用 mocks 创建模块(就是模拟数据)
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      setTimeout(() => {
        cb([ /* mocked response */ ])
      }, 100)
    }
  }
})

// 用指定的 mutaions 测试 action 的辅助函数
const testAction = (action, args, state, expectedMutations, done) => {
  let count = 0

  // 模拟提交，进行断言
  const commit = (type, payload) => {
    /**
     * 这里的mutation 是一个{ type: 'increment', payload: ...}的Object
     * type就是action(type, payload)
     */
    const mutation = expectedMutations[count]


    //一下就是action测试的所有断言
    try {
      //断言传入的mutation.type和commit(type)是一致的
      expect(mutation.type).to.equal(type)
      if (payload) {
        //断言mutation.payload和commit(type, payload)中的载荷相同
        expect(mutation.payload).to.deep.equal(payload)
      }
    } catch (error) {
      done(error)
    }
    //当count大于expectedMutations数组就测试完毕
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }


  /**
   * new Vuex.Store({
   *  action(context, playload){}  //context是一个与store具有相同属性和方法的对象
   * ]})
   */
  // 用模拟的 store 和参数调用 action  args就是playload对象
  action({ commit, state }, ...args)

  // 检查是否没有 mutation 被 dispatch
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('actions', () => {
  it('getAllProducts', done => {
    //开始测试每一个action
    testAction(actions.getAllProducts, [], {}, [
      { type: 'REQUEST_PRODUCTS' },
      { type: 'RECEIVE_PRODUCTS', payload: { /* mocked response */ } }
    ], done)
  })
})