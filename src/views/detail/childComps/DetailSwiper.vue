<template>
  <swiper class="DetailSwiper">
      <swiperItem v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
      </swiperItem>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'

export default {
    naem:'DetailSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.DetailSwiper{
    height: 300px;
    /* overflow: hidden; */
}
</style>