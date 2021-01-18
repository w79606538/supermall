//防抖函数
export function debounce(fun, delay = 200) {
  let timmerId = null
  return function (...args) {
    // console.log(timmerId);
    //获取函数的作用域和变量
    let that = this;
    if (timmerId) {
      clearTimeout(timmerId) //清空定时器函数
    }
    timmerId = setTimeout(() => {
      fun.apply(that, args)
    }, delay)

  }
}

//节流函数
export function throttle(fun, duration = 1000) {

  let last = new Date().getTime();  // 初始化一个时间，也作为高频率事件判断事件间隔的变量，通过闭包进行保存。
  let flag = true
  console.log('第一次' + last);
  return function (args) {
    let that = this;
    let now = new Date().getTime();
    console.log('第二次' + last);
    console.log(now - last);
    console.log(flag);
    if (now - last >= duration || flag) {  // 如果本次触发和上次触发的时间间隔超过设定的时间
      fun.call(that, args);  // 就执行事件处理函数 （eventHandler）
      last = now;  // 然后将本次的触发时间，作为下次触发事件的参考时间。
      console.log('更新后' + last);
      flag = false
    }

  }

}

export function throttle_01(func, delay, immediate = false) {
  let timer = null;
  return (...args) => {
    console.log(timer);
    if (immediate) {
      func.apply(this, args);
    } else {
      if (timer == null) {
        timer = setTimeout(function () {
          func.apply(this, args);
          clearTimeout(timer);
        }, delay);
      }
    }

  }
}
