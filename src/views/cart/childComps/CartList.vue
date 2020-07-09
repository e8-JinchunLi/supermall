<template>
 <!-- <scroll class="cart-scroll"> -->
  <div class="cart-list">
        <div>
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" ></cart-list-item>
        </div>
  </div>

 <!-- </scroll> -->
</template>

<script>

import CartListItem from './CartListItem'
// import Scroll from '@/components/common/scrool/Scrool'


export default {
    name:'CartList',
    components:{
        CartListItem,
        // Scroll
    },
    props:{
        cartList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

/* .cart-scroll{
    overflow: hidden;
    height: calc(100% - 44px - 49px - 44px);   
} */
</style>