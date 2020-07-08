<template>
  <div class="cart-list">
        <div>
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" ></cart-list-item>
        </div>
  </div>
</template>

<script>

import CartListItem from './CartListItem'

export default {
    name:'CartList',
    components:{
        CartListItem,
        
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

</style>