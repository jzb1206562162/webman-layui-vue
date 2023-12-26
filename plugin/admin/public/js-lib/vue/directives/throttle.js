//防止按钮在短时间内被多次点击，
// <button v-throttle="{fn: throttle,time:3000}">throttle节流</button>
const throttle = {
    mounted (el,{value:{fn,time}}) {
        if (typeof fn !== 'function') return
        el._flag = true;//开关默认为开
        el._timer = null
        el.handler = function () {
            if (!el._flag) return;
            //执行之后开关关闭
            el._flag && fn()
            el._flag = false
            if (el._timer !== null) {
                clearTimeout(el._timer)
                el._timer = null
            }
            el._timer = setTimeout(() => {
                el._flag = true;//三秒后开关开启
            }, time);
        }
        el.addEventListener('click',el.handler)
    },
    unbind:function (el,binding) {
        el.removeEventListener('click',el.handler)
    }
}