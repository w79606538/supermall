<template>
  <!-- 调用tabbar组件 -->
  <tab-bar>
    <!-- 调用tabBarItem 组件
    path:为向子组件传递的参数
    -->
    <tab-bar-item path="/home">
      <img src="~@/assets/image/tabBar/home.svg" slot="item_icon_normal"/>
      <img src="~@/assets/image/tabBar/home_active.svg" slot="item_icon_active"/>
      <div slot="item_text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~@assets/image/tabBar/category.svg" slot="item_icon_normal"/>
      <img src="~@/assets/image/tabBar/category_active.svg" slot="item_icon_active"/>
      <div slot="item_text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shop">
      <img src="~@/assets/image/tabBar/cart.svg" slot="item_icon_normal"/>
      <img src="~@/assets/image/tabBar/cart_active.svg" slot="item_icon_active"/>
      <div slot="item_text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile">
      <img src="~@/assets/image/tabBar/profile.svg" slot="item_icon_normal"/>
      <img src="~@/assets/image/tabBar/profile_active.svg" slot="item_icon_active"/>
      <div slot="item_text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "@/components/common/tabBar/Tabbar"
import tabBarItem from "@/components/common/tabBar/TabbarItem"

export default {
  name: "MainTarbar",
  components: {
    tabBar,
    tabBarItem
  }
}
</script>

<style scoped>

</style>
