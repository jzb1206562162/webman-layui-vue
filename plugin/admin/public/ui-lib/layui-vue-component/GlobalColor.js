const GlobalColor = {
template: `
    <ul class="color-list">
      <li :style="{'background':option}" v-for="(option, index) in options" :key="index" @click="handlerChange(option)"><lay-icon v-if="option == modelValue" type="layui-icon-ok"></lay-icon></li>
    </ul>
`,
    props: {
        modelValue: {
            type: String,
            default: '#009688',
        },options: {
            type: [String,Array],
            default:  ['#009688','#36b368','#2d8cf0','#f6ad55','#f56c6c','#3963bc'],
        },
    },

    data() {
        return {
        }
    },
    methods:{
        handlerChange(color){
            this.$emit('update:modelValue', color);//修改props里由上层传来的属性需要像这样才能改
            // console.log('GlobalColor-handlerChange',color)
        }
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
	
              .color-list {
            display: inline-block;
            margin: 20px 0px 15px 0px;
        }
        .color-list li {
            float: left;
            text-align: center;
            width: 24px;
            height: 24px;
            line-height: 24px;
            margin-left: 14px;
            border-radius: 2px;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 15%);
            color: white;
        }
    `;
        document.head.appendChild(style);
    }
}