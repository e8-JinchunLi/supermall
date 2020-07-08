<template>
  <div class="bottom-bar">
      <div class="bar-item bar-left">
          <div>
              <i class="icon servic"></i>
              <span class="text">客服</span>
          </div>
          <div>
              <i class="icon shop"></i>
              <span class="text">店铺</span>
          </div>
          <div>
              <i class="icon select"></i>
              <span class="text">收藏</span>
          </div>
      </div>
      <div class="bar-item bar-right">
          <div class="cart" @click="addCartClick">加入购物车</div>
          <div class="buy">购买</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'DetailBottomBar',
    methods:{
        addCartClick(){
            this.$emit('addCart')
        }
    }
}
</script>

<style scoped>
    .bottom-bar{
        /* line-height: 58px; */
        height: 58px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;

        display: flex;
        align-items: center;
        text-align: center;
    }
    .bar-item{
        display: flex;
        flex: 1;
        justify-content: space-evenly;
    }
    .bar-item>div{
        flex: 1;
    }
    .bar-left .icon{
        display: block;
        width: 22px;
        height: 22px;
        margin: 5px auto 3px;
        background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    }
    .bar-left .service {
    background-position:0 -54px;
    }

   .bar-left .shop {
    background-position:0 -98px;
    }
    .bar-right {
        line-height: 58px;
        color: #fff;
        font-size: 15px;
    }
    .bar-right .cart{
        background-color: #ffe817;
        color: #333;
    }
    .bar-right .buy{
        background-color: #f69;
    }
</style>