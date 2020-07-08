<template>
  <div id="cart-item">
      <div class="item-selector">
          <check-button @checkBtnClick="checkChange" :isCheck='itemInfo.checked'></check-button>
      </div>
      <div class="item-img">
          <img :src="itemInfo.imgURL" alt="">
      </div>
      <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">商品描述:{{itemInfo.desc}}</div>
          <div class="info-bottom">
              <div class="item-price left">¥{{itemInfo.realPrice}}</div>
              <div class="item-count right">X{{itemInfo.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
export default {
    name:'CartListItem',
    props:{
        itemInfo:{
            type:Object,
            default(){
                return {}
            }
        },

    },
    components:{
        CheckButton
    },
    methods:{
        checkChange(){
            this.$store.commit('checkedChange',this.itemInfo.index)
        }
    }

}
</script>

<style>
#cart-item{
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.item-selector{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
}
.item-img{
    margin: 10px;
}
.item-img img{
    width: 80px;
    height: 100px;
    border-radius: 5px;
}
.item-info{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 17px;
    color: #333;
}
.item-desc,.item-title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.item-desc{
    color: #666;
    font-size: 14px;
}
.info-bottom{
    flex-basis: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.info-bottom .item-price{
    color: orange;

}

</style>