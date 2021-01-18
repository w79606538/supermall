<template>

  <div id="home" class="wrapper">
    <!-- 显示标题-->
    <main-nav class="home-nav"></main-nav>


    <tab-control v-show="isTabfixed" :class="{tabcontrol: isTabfixed === true}" :tabs="['流行','新款','精选']"
                 :tabindex="currentIndex" @tab-click="tabClick"></tab-control>

    <!--
     probe-type=3  监测滚动条滚动
     @scroll 接受子组件滚动事件
     -->
    <scroll class="scroll" ref="scroll" :probe-type="3"
            @scroll="scroll"
            :pullup="true" @scrollToEnd="scrollToEnd"
    >
      <div id="swiper">
        <!-- 轮播图-->
        <home-swiper :banners="banners"></home-swiper>
      </div>
      <!-- 显示推荐-->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 显示特殊 -->
      <feature></feature>


      <tab-control v-show="!isTabfixed" :class="{tabcontrol: isTabfixed === true}" ref="tabcontrol"
                   :tabs="['流行','新款','精选']" :tabindex="currentIndex"
                   @tab-click="tabClick"></tab-control>


      <!-- 显示商品列表-->
      <good-list :goods="goodList" class="goods"></good-list>


    </scroll>

    <!--显示返回顶部按钮
    给组件注册点击事件必须加上.native属性
    -->
    <back-top @click.native="backClick()" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommend from "@/views/home/childComps/HomeRecommend";
import Feature from "@/views/home/childComps/Feature";


import MainNav from "@/components/context/MainNav";
import TabControl from "@/components/context/tabControl/TabControl";
import GoodList from "@/components/context/goods/GoodList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/context/backTop/BackTop";


import {getMultiData, getGoodData} from "@/network/home";
import {debounce, throttle, throttle_01} from "@/common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    Feature,
    MainNav,
    TabControl,
    GoodList,
    Scroll,
    BackTop

  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentIndex: 0,
      currentType: 'pop',
      isShowBackTop: false,
      homeScroll: {},
      tabControlHeight: 0,
      isTabfixed: false

    }
  },
  provide() { //向所有组件传递一个属性或方法
    return {
      'homeScroll': '2222'
    }
  }
  ,
  computed: {
    //获取goods对象
    goodList() {
      return this.goods[this.currentType].list
    },
  },
  created() {
    //调用methods中的方法
    this.getHomeMultiData()
    //获取商品的数据
    this.getHomeGoodData('pop')
    this.getHomeGoodData('new')
    this.getHomeGoodData('sell')
    this.homeScroll = this.$refs.scroll

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on("imageLoad", () => {
      refresh()
      if(this.tabControlHeight===0){
        this.tabControlHeight = this.$refs.tabcontrol.$el.offsetTop
      }

    })


  },
  methods: {

    //返回顶部点击事件
    backClick() {
      //调用 scroll组件的方法返回顶部
      this.$refs.scroll.backTop();
    },
    scroll(pos) {
      //当滚动的Y轴距离大于1000的时候显示返回顶部图标
      this.isShowBackTop = (-pos.y) > 1000
      console.log(this.tabControlHeight)
      this.isTabfixed = -(pos.y) > this.tabControlHeight


    },
    printMess(message) {
      console.log(message);
    },
    scrollToEnd() {
      // console.log('-----');

      // const aa = throttle_01(()=>{
      //   console.log('上拉加载更多');
      // }, 500)
      // aa()
      //加载数据
      //


      const pullup = debounce(this.getHomeGoodData, 100)

      pullup(this.currentType)
      // /* 节流01测试 */
      // const throttle_01_apply = throttle(this.printMess, 100);
      // throttle_01_apply('sadsa')

    },
    //获取远程数据
    getHomeMultiData() {
      getMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoodData(type) {
      const page = this.goods[type].page + 1
      getGoodData(type, page).then(res => {
        //把数组添加到goods中对象数组中  ...批量添加数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page
      })
    },
    tabClick(index) { //获取点击了那个tab组件

      this.currentIndex = index
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }



    }


  },
  updated() {

    // let img = this.$refs.wrapper.getElementsByTagName('img')
    // console.log(img);
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.wrapper {

  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden


}

.scroll {

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}


.tabcontrol {
  /*把当前div固定到高度为44px的位置上*/
  /*position: sticky;*/
  /*top: 44px;*/
  /*background-color: var(--color-background);*/
  position: fixed;
  top: 43px;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #fffdfd;
}

.goods {

}


</style>
