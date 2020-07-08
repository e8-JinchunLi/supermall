<template>
  <div class="icon-selector" @click="selectItem" :class="{'selector-active':isCheck}" >
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'CheckButton',
    methods:{
        selectItem(){
            this.$emit('checkBtnClick')
            // this.$store.commit('checkedChange') 
        }
    },
    props:{
        isCheck:{
            type:Boolean,
            default:false
        }
    },
}
</script>

<style>
.icon-selector{
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    margin: 0;
    cursor: pointer;
    border-radius: 50%;

}
.icon-selector img{
    display: block;
}
  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>