<template>
  <div>
    <banner>
      <banner-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image"  alt="" >
        </a>
      </banner-item>

    </banner>
  </div>
</template>

<script>

import Banner from "@/components/common/banner/Banner";
import BannerItem from "@/components/common/banner/BannerItem";

export default {
  name: "HomeSwiper",
  components: {
    Banner,
    BannerItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      isLoad: false
    }
  },
  created() {

  },
  methods: {
    //图片第一次加载完成后调用
    imageLoad(){
      if(!this.isLoad){
        //调用子组件中的方法
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>


</style>
