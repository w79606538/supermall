<template>
  <div id="hy-swiper">
    <!--图片显示块-->
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <!-- 左右方向键-->
    <slot name="indicator">
    </slot>
    <!--显示方向键-->
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}"
             :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    //定义轮播周期 默认3秒
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },

  },
  data() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前图片的index
      scrolling: false, // 是否正在滚动 相当于加了一个锁
      playTimer: 0, //定时器ID
      startX: 0,//图片拖动开始位置
      currentX: 0,//图片拖动的距离
      distance: 0//距离
    }
  },
  mounted() {
    setTimeout(() => {
      // 1.操作DOM, 在前后添加Slide
      this.handleDom();
      // 2.开启定时器
      this.startTimer();

      //console.log(this.playTimer);
    }, 200)
  },
  methods: {
    //定时器 自动滚动图片
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        //移动图片
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval)
    },
    stopTimer() { //停止定时器
      window.clearInterval(this.playTimer)
    },
    scrollContent(currentPosition) { //移动图片
      //1.加锁
      this.scrolling = true
      //2.开始滚动动画
      this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
      this.setTransform(currentPosition)
      //4.判断滚动到的位置
      this.checkPosition();
      //解锁
      this.scrolling = false;
    },
    setTransform(position) { //设置图片移动的位置
      //向X轴移动position像素
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`
      //兼容性
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;

    },
    checkPosition() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex - 1);
      }, this.animDuration)
    },
    handleDom() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper');
      let slidesEls = swiperEl.getElementsByClassName('slide');
      // 2.保存个数
      this.slideCount = slidesEls.length;
      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);

    },
    /**
     * 拖动事件的处理
     */
    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;
      // 2.停止定时器
      this.stopTimer();
      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;

    },
    touchMove(e) { //拖动图片
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      // 2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }
      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * 控制上一个, 下一个
     */
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },

    changeItem(num) {
      // 1.移除定时器
      this.stopTimer();

      // 2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      // 3.添加定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1.0);
}
</style>
