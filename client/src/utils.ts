

export function loadMore(element: HTMLDivElement, callback: any) {
  function _loadMore() {
    let containerHeight = element.clientHeight;
    let scrollTop = element.scrollTop; // 卷起来的高度
    let scrollHeight = element.scrollHeight;
    console.log("containerHeight + scrollTop: " +( Number(containerHeight) + Number(scrollTop)))
    console.log("scrollHeight: "+ scrollHeight)
    if (containerHeight + scrollTop + 50 >= scrollHeight) {
      callback()
    }
  }
  element.addEventListener('scroll', _loadMore);
}

export function throttle(fn: Function, wait: number, first = true) {
  let timer: any = null;
  return function (...args) {
    if (!timer && first) {
      fn.call(this, ...args);
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  }
}
export function debounce(fn: Function, wait: number, first = true) {
  let timer: any = null;
  return function (...args) {
    if (first && !timer) {
      fn.call(this, ...args)
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
      timer = null;
    })
  }
}