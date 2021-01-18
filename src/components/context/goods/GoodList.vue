<template>
  <div class="good-list">
    <good-item v-for="(item,index) in goods" :goodItem="item"></good-item>
  </div>
</template>

<script>
import GoodItem from "@/components/context/goods/GoodItem";

export default {
  name: "goodList",
  components: {
    GoodItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    //console.log(this.homeScroll);
  },
  inject: ['homeScroll']
}
</script>

<style scoped>
.good-list {
  display: flex;
  /*每行显示固定的数据*/
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;

}
</style>
