<template>
<div class="bootom-menu">
    <div class="select-all">
        <check-button :isCheck="isSelectAll" @click.native="cartBottomAllClick" />
        <span>全选</span>
    </div>
    <span class="total-price">合计：{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkLength}})</span>
</div>
</template>

<script>
import CheckButton from './CheckButton'

import { mapGetters } from 'vuex'
export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },

    computed:{
        //通过mapGetters方法将Getter中的方法映射到computed中
        ...mapGetters(['cartList']),
        totalPrice(){
            return '¥' + this.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.realPrice * item.count
            },0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.checked===true).length
        },
        isSelectAll(){


            // console.log(this.cartList)
            if(this.cartList.length === 0) return false
            // this.isSelect=this.cartList.every(item => item.checked !==  false)
            // return this.isSelect
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods:{
        cartBottomAllClick(){

            this.$store.commit('cartBottomAll',this.isSelectAll)
        }
    }
}
</script>

<style>
.bootom-menu{
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.select-all{
    display: flex;
    align-items: center;
}

.buy-product{
    background-color: orangered;
    color: #fff;
    width: 100px;
    text-align: center;
}
</style>