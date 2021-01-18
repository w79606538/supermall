<template>
  <div class="good-item">
    <a :href="goodItem.link">
      <img :src="goodItem.show.img" alt="" @load="imageLoad()">
      <div class="goods-info">
        <p>{{ goodItem.title }}</p>
        <span class="price">{{ goodItem.price }}</span>
        <span class="collect">{{ goodItem.cfav }}</span>
      </div>
    </a>


  </div>
</template>

<script>
export default {
  inject: ['homeScroll'],
  name: "GoodItem",
  props: {
    goodItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    //判断图片是否都加载完成
    imageLoad() {
      //给总线放入imageLoad方法
      this.$bus.$emit('imageLoad')
    }
  }

}
</script>

<style scoped>
.good-item {
  padding-bottom: 40px;
  position: relative;
  /*让div占40 每一行就平分了2个*/
  width: 48%;

}

.good-item img {
  width: 100%;
  /*半角*/
  border-radius: 5px;
}

.goods-info {

  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  text-overflow: ellipsis;
  /*只显示一行 剩余的显示....*/
  white-space: nowrap;
  /*多余的隐藏掉*/
  overflow: hidden;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

/*使用伪类在span前面添加一个图标*/
.goods-info .collect::before {
  /*此属性必须有*/
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~@/assets/image/common/collect.svg") 0 0/14px 14px;
}


</style>
