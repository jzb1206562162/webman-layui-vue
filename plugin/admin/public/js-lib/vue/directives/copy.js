//自定义指令copy和使用方法
const copy={
    // <div v-copy> 单击复制内容是div里面的内容 </div>
    // <div v-copy.dblclick="'23'"> 双击复制,内容为绑定内容23 </div>
    mounted (el, binding) {
        el.style.cursor = 'copy'
        el.addEventListener(binding.modifiers.dblclick ? 'dblclick' : 'click', () =>
            handleClick(binding.value?binding.value:el.innerText, el))
        function handleClick (text) {
            // 创建元素
            if (!document.getElementById('copyTarget')) {
                const copyTarget = document.createElement('input')
                copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
                copyTarget.setAttribute('id', 'copyTarget')
                document.body.appendChild(copyTarget)
            }

            // 复制内容
            const input = document.getElementById('copyTarget')
            input.value = text
            //第一种方式的优点是兼容性好，缺点是在某些浏览器中可能受到安全策略的限制；
            input.select()
            document.execCommand('copy')
            // 第二种方式的优点是实现更方便，缺点是兼容性较差。根据具体的需求和目标浏览器，可以选择适合的方式来实现文本复制操作
            // input.setSelectionRange(0, input.value.length)
            // navigator.clipboard.writeText(text)
            layer.msg("复制成功", { time: 1000, icon: 1 })
        }
    }
}