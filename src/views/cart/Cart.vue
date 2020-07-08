<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
    <scroll class="cart-scroll">
    <cart-list :cart-list="cartList"></cart-list>
    </scroll>
    <cart-bottom-bar />
  </div>
</template>

<script>

import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from '@/components/common/scrool/Scrool'
import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
      cartList(){
        return this.$store.getters.cartList
      }
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight:700 ;
}
.cart-scroll{
    overflow: hidden;
    height: calc(100% - 44px - 49px - 44px);   
}
</style>
