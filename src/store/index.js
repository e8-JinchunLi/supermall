import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    
    addCart(state,payLoad){
      // console.log(payLoad)
      //通过find函数寻找是否为同一个商品
      const oldCartItem = state.cartList.find(item => item.iid === payLoad.iid)

      //如果相同
      if(oldCartItem){
        oldCartItem.count += 1
      }else{
        payLoad.checked = false
        payLoad.count=1
        payLoad.index = state.cartList.length
        state.cartList.push(payLoad)
      }
    },
    checkedChange(state,payLoad){
      // console.log(state.cartList)
      // console.log(state.cartList[payLoad].checked)
      state.cartList[payLoad].checked = !state.cartList[payLoad].checked
    }
  },
  actions: {
  },
  modules: {
  },
  getters
})
