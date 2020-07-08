<template>
  <div>
      <nav-bar>
          <div slot="left">
              <div class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
              </div>
          </div>
          <div slot="center" class="title">
              <div class="titlesItem" v-for="(item,index) in titles" :key="index"
                :class="{active:index===currentIndex}"
                @click="itemClick(index)">
              {{item}}    
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        backClick(){
            this.$router.back()
        },
        itemClick(index){
            // console.log(this.currentIndex)
            this.currentIndex=index
            this.$emit('detailNavClick',index)
        }
    }
}
</script>

<style>
.title{
    display: flex;
    font-size: 13px;
}
.titlesItem{
    flex: 1;
}
.active{
    color: var(--color-high-text);
}
.back img{
    margin-top: 12px;
}
</style>