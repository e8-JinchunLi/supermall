<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车</div></nav-bar>
    <scroll class="cart-scroll" ref="scroll">
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
// import {debounce} from '@/common/utils'


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
    },
    mounted(){
        // const refresh = debounce(this.$refs.scroll.refresh,50)
        // this.$bus.$on('cartImgLoad',() => {
        //     if(this.$refs.scroll) refresh()
        // })

         this.$bus.$on('cartImagLoad',() => {
          //  console.log(this.$refs.scroll.scroll)
            this.$refs.scroll.refresh()
        })
    }
  }
</script>

<style scoped>
.cart{
  left: 0;
  top: 0;
  overflow: hidden;
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight:700 ;
}
.cart-scroll{
    position: relative;
    left: 0;
    top: 0;
    overflow: hidden;
    height: calc(100% - 44px - 49px - 44px);   
}
</style>
