<template>
  <div class="wrpper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{
            scroll:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll =new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        }),
        //监听滚动
        this.scroll.on('scroll',(position) =>{
            // console.log(position)
            this.$emit('scroll',position)
        }),
        //监听上拉加载更多
        this.scroll.on('pullingUp', () =>{
        
            this.$emit('pullingUp')
        })
    },
    methods:{
        //scrollTo的包装方法
        scrollTo(x,y,time=300){
            //防止scroll未生成就要调用scroll所产生的错误
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
            // console.log(this.scroll)
            this.scroll && this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>