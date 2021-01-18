<template>
  <!-- 定义图片-->
  <div class="tarBar-item" @click="itemClick()">
    <!--  定义三个插槽
      item_icon_normal:默认显示的图片
      item_icon_active:点击后选中的图片
      item_text:显示的文本
      -->
    <!--为选中样式-->
    <div v-show="!isActive">
      <slot name="item_icon_normal"></slot>
    </div>
    <div v-show="isActive">
      <!--选中样式-->
      <slot name="item_icon_active"></slot>
    </div>
    <div :style="activeStyle">
      <!-- 定义显示文本-->
      <slot name="item_text"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "TabbarItem",
  //子组件中定义2个属性  path:要跳转的路由  activeColor：点击后文本要显示的颜色
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {}
  },
  //计算属性
  computed: {
    //判断活跃的路由
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    //显示活跃路由的文本颜色
    activeStyle() {

      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    //点击事件
    itemClick() {
      //手动跳转
      this.$router.push({
        path: this.path
      })
    }
  },

}
</script>

<style>

.tarBar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  padding-top: 2px;
}

.tarBar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}


</style>
