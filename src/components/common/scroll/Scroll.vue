<template>
  <div class="wrapper" ref="wrapper">
    <div class="context">
      <slot></slot>
    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullup: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {


    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,//点击属性
      probeType: this.probeType,//监听滚动事件
    })


    //监听滚动事件
    if (this.scroll) {
      this.scroll.on('scroll', (pos) => {
        //把事件发射出现,让父组件接受
        this.$emit('scroll', pos)
      })
    }

    //上拉加载
    if (this.pullup) {
      this.scroll.on('scrollEnd', () => {
        //把事件发射出现,让父组件接受
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          this.$emit('scrollToEnd')
        }
      })
    }


  },
  methods: {
    //返回到顶部方法
    backTop(x = 0, y = 0, time = 500) {
      /**
       * 第一个参数  X轴位置
       * 第二个参数  Y抽位置
       * 第三个参数  滚动的时间
       */
      this.scroll.scrollTo(x, y, time)

    },
    refresh() {
     // console.log('----');
      this.scroll.refresh()
    }
  },
  updated() {
    //   let img = this.$refs.wrapper.getElementsByTagName('img')
    //   let count = 0
    //   let length = img.length
    //   if (length) {
    //     let timer = setInterval(() => {
    //       if (count == length) {
    //         this.scroll.refresh()//bs提供的刷新的方法，详见官网
    //         clearInterval(timer)
    //       } else if (img[count].complete) {
    //         count ++
    //       }
    //     }, 20)
    //   }
    // }
  }
}
</script>

<style scoped>
.context {

}
</style>
