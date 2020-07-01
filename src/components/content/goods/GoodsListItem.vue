<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imageLoad(){
            //因为首页的goods和详情页的goods是用同一个组件所以这种方式判断当前激活路由
            //通过判断当前激活路由中的路径来发送Load方法
            if(this.$route.path.indexOf('/home')!==-1){
                this.$bus.$emit('itemImageLoad')
            }else if(this.$route.path.indexOf('/detail')!==-1){
                this.$bus.$emit('detailRecommendsImageLoad')
            }
        },
        itemClick(){
            this.$router.push('/detail/'+this.goodsItem.iid)
        }
    },
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    }
}
</script>

<style>
.goods-item{
    width: 48%;
    position: relative;
    padding-bottom: 10px;
}
.goods-item img{
    width: 100%;
    border-radius: 5px;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;

}
.goods-info{
    font-size: 12px;
    overflow: hidden;
}
.goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect{
    position: relative;
} 
.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>