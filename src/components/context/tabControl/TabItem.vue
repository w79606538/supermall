<template>
  <div class="goods-item">
    <div v-for="(item,index) in goodItem.list "  class="item">
      <img :src="item.show.img" alt="">

    </div>
  </div>
</template>

<script>
export default {
  name: "TabItem",

}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img{
  height: 80px;
  width: 80px;
}

</style>
