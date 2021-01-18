<template>
  <div class="recommendStyle">
    <!-- 显示文字-->
    <recommend-com v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div>{{ item.title }}</div>
      </a>
    </recommend-com>
  </div>
</template>

<script>
import RecommendCom from "@/views/home/childComps/RecommendCom";

export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    RecommendCom
  }
}
</script>

<style scoped>
.recommendStyle {
  display: flex;
  width: 100%;
  text-align: center;
  border-bottom: 10px solid #eee;
  margin-top: -3px;
}
</style>
