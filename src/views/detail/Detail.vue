<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="detail-scroll" ref="scroll">
            <detail-swiper :topImages="topImages" />
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop" ></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"  />
            <detail-param-info :paramInfo="paramInfo"  />
            <detail-comment-info :comment-info="commentInfo" />
            <detail-recommends :goods="recommends" />
        </scroll>
  </div>
</template>

<script>
//导入封装后的navBar组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommends from '@/components/content/goods/GoodsList'

import Scroll from '@/components/common/scrool/Scrool'

//网络请求
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
import {debounce} from '@/common/utils'

export default {
    name:'Detail',
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[]
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailRecommends
    },
    created(){
        this.iid=this.$route.params.iid
        getDetail(this.iid).then( res =>{
            // console.log(res) 
            const data = res.result
            this.topImages = data.itemInfo.topImages

            //获取商品信息
            this.goods = new Goods(data.itemInfo , data.columns , data.shopInfo.services)

            //获取店铺信息
            this.shop = new Shop(data.shopInfo)

            //获取商品详细信息
            this.detailInfo = data.detailInfo

            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //获取评论信息
            if(data.rate.list){
                this.commentInfo = data.rate.list[0]
            }
        })
        getRecommend().then(res => {
            console.log(res)
            this.recommends = res.data.list
        })
    },
    mounted(){
        //使用防抖函数对商品的相信信息进行处理
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('goodsInfoLoad',() => {
            if(this.$refs.scroll) refresh()
        })
        //接受Recommends的图片加载事件用来防抖加载处理
        this.$bus.$on('detailRecommendsImageLoad',() =>{
            if(this.$refs.scroll) refresh()
        })
    },
    methods:{
        // imageLoad(){
        //     this.$refs.scroll.refresh()
        // }
    }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index:11;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}

/* 使用 计算的方式来使用scroll*/

.detail-scroll{
    overflow: hidden;
    height: calc(100% - 44px);
}
</style>