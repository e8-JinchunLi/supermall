<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="scroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from '@/views/home/childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'  
  import Scroll from '@/components/common/scrool/Scrool'
  import BackTop from '@/components/content/backTop/BackTop'
   

  import {getHomeMultidata,getHomeGoods} from '@/network/home'

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[] },
          'new':{page:0,list:[] },
          'sell':{page:0,list:[] },          
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted(){
      this.$bus.$on('itemImageLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //事件相关
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType='pop'
            break;
          case 1:  
            this.currentType='new'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
      } ,
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      scroll(position){
        this.isShowBackTop = (-position.y)>1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      // 网络请求相关
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          this.banners= res.data.banner.list;
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page =this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          // console.log(res)
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}

/* 滑动设置 
  按照定位的方式来进行滑动
*/
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
