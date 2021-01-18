<template>
  <div class="tab-control">
    <div class="tab-item" v-for="(item,index) in tabs" @click="itemClick(index)">
      <span :class="{active: index === tabindex}">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    tabindex: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  data() {
    return {

    }
  },
  mounted() {
    //this.currentIndex=this.$root.currentIndex
  }
  ,
  methods: {
    itemClick(index) {

      this.tabindex = index
      //通知父组件点击了那个tab
      this.$emit("tab-click", this.tabindex)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 15px;
  z-index: 9;
}

.tab-item {
  flex: 1;

}

.tab-item span {
  padding: 5px;
}

.tab-item .active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
