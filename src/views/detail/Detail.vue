<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @detailNavClick="detailNavClick" ref="detailNav"></detail-nav-bar>
        <scroll class="detail-scroll" ref="scroll" @scroll="detailScroll" :probeType="3">
 
            <detail-swiper :topImages="topImages" />
            <detail-base-info :goods="goods" ></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @goodsInfoLoad="goodsInfoLoad" />
            <detail-param-info :paramInfo="paramInfo" ref="paramsInfo" />
            <detail-comment-info :comment-info="commentInfo" ref="commentInfo" />
            <detail-recommends :goods="recommends" ref="recommends"/>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop" />
        <detail-bottom-bar @addCart="addCart" />
        <toast :message="message" :isShow="show" />
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
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from '@/components/content/backTop/BackTop'

import Scroll from '@/components/common/scrool/Scrool'
import Toast from '@/components/common/toast/Toast'

//网络请求
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
import {debounce} from '@/common/utils'

//混入backTop
import {backTopMixin} from "@/common/mixin"
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
            recommends:[],
            themeTops:[],
            getThemeTopYs:null,
            currentIndex:0,
            message:'',
            show: false
        }
    },
    mixins:[backTopMixin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailRecommends,
        DetailBottomBar,
        BackTop,
        Toast
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
            this.recommends = res.data.list
        })
    },
    updated(){
        this.getOffsetTops()
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
        goodsInfoLoad(){
            this.getThemeTopYs()
        },
        detailNavClick(index){
            this.$refs.scroll.scrollTo(0,-(this.themeTops[index]-44),100)
        },
        detailScroll(position){
            // console.log(position)
            const positionY = -position.y

            //循环比较长度，若在区间中则将index更改
            for(let i =0;i<this.themeTops.length;i++){
                if(this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
                    this.currentIndex = i
                    // console.log(this.currentIndex)
                    this.$refs.detailNav.currentIndex = this.currentIndex
                }
            }
            //用swich重构一下 应该效率更高一点


            //利用滚动显示backTop
            this.isShowBackTop = positionY > 1000 

        },
        getOffsetTops(){
            this.getThemeTopYs = debounce(()=>{
                this.themeTops =[]
                this.themeTops.push(0)
                this.themeTops.push(this.$refs.paramsInfo.$el.offsetTop)
                this.themeTops.push(this.$refs.commentInfo.$el.offsetTop)
                this.themeTops.push(this.$refs.recommends.$el.offsetTop)
                this.themeTops.push(Number.MAX_VALUE)
            },0)
        },
        //
        addCart(){
            const obj = {}

            obj.iid =this.iid
            obj.imgURL = this.topImages[0]
            obj.title = this.goods.title
            obj.desc = this.goods.desc
            obj.realPrice = this.goods.realPrice
            // this.$store.commit('addCart',obj) 
            this.$store.dispatch('addCart',obj).then(res =>{
                this.show =true
                this.message = res

                setTimeout(() => {
                    this.show = false
                    this.message = ''
                },1500)
            })
        }
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