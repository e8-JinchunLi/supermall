<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="scroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
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
  import {debounce} from '@/common/utils'

  import {backTopMixin} from '@/common/mixin'


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
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    mixins:[backTopMixin],
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
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',()=>{
        // this.$refs.scroll.refresh()
        refresh()
      })
    },
    //重新激活时到达之前的位置
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    //离开时记录滑动的位置
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
      
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //防抖函数
      // debounce(func,delay){
      //   let timer = null
      //   return function (...args){
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(()=>{
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },
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
        this.$refs.tabControl1.currentIndex=index
        this.$refs.tabControl2.currentIndex=index
      } ,
      scroll(position){
        //backTop是否显示
        this.isShowBackTop = (-position.y)>1000
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      //根据轮播图加载传过来的事件
      swiperImageLoad(){

        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
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
  /* padding-top: 44px; */
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3; */
}
/* 原生滚动 sticky */
/* .tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/*  */
.tab-control{
  position: relative;
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
