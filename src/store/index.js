import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    

    //购物车中 计算商品的选择
    checkedChange(state,payLoad){
      // console.log(state.cartList)
      // console.log(state.cartList[payLoad].checked)
      state.cartList[payLoad].checked = !state.cartList[payLoad].checked
    },
    //购物车中的全选按钮
    cartBottomAll(state,payLoad){
      // console.log('------')
      // console.log(payLoad)
      if(payLoad){
        state.cartList.forEach(item => item.checked = false)
      }else{
        state.cartList.forEach(item => item.checked = true)
      }
    }

  },
  actions: {
    addCart(context,payLoad){
      return new Promise((resolve) =>{
                // console.log(payLoad)
      //通过find函数寻找是否为同一个商品
      const oldCartItem = context.state.cartList.find(item => item.iid === payLoad.iid)
      //如果相同
      if(oldCartItem){
        oldCartItem.count += 1
        resolve('当前商品数量+1')
      }else{
        payLoad.checked = false
        payLoad.count=1
        payLoad.index = context.state.cartList.length
        context.state.cartList.push(payLoad)
        resolve('添加了新的商品')
      }
      })
    },
  },
  modules: {
  },
  getters
})
