const GlobalSetupTheme = {
    props: {
        modelValue: {
            type: String,
            default: '#009688',
        }, options: {
            type: Array,
            default:[
                {logo:'#28333e',head:'white',side:'#28333e',body:'#f4f5f7',value: 'dark'},
                {logo:'white',head:'white',side:'white',body:'#f4f5f7', value: 'light'}
            ]
        }, disabled: {
            type: Boolean,
            default:false
        },
    },
    template: `
  <ul class="global-setup-theme" :class="{'disabled': disabled}">
    <template v-for="(option, index) in options" :key="index">
      <li class="global-setup-theme-item" @click="handlerChange(option.value)">
      <a href="javascript:;">
        <div>
          <span class="logo" :style="[{'background-color': option.logo}]"></span>
          <span class="head" :style="[{'background-color': option.head}]"></span>
        </div>
        <div>
          <span class="side" :style="[{'background-color': option.side}]"></span>
          <span class="body" :style="[{'background-color': option.body}]">
            <lay-icon v-if="option.value == modelValue" type="layui-icon-ok"></lay-icon>
          </span>
        </div>
      </a>
    </li>
    </template>
  </ul>`
    ,
    data() {
        return {}
    },
    methods: {
        handlerChange(color){
            if(!this.disabled){
                this.$emit('update:modelValue', color);//修改props里由上层传来的属性需要像这样才能改
            }
            // console.log(color)
        }
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
    .global-setup-theme {
          padding: 10px 10px;
        }
        
        .global-setup-theme.disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .global-setup-theme.disabled * {
          cursor: not-allowed;
        }
        
        .global-setup-theme-item {
            width: 74px;
            position: relative;
            display: inline-block;
            vertical-align: top;
            margin: 0 20px 0 0;
            padding: 2px 2px 2px 2px;
            background-color: #f2f2f2;
            cursor: pointer;
        }
        
        .global-setup-theme-item .logo {
            display: block;
            width: 20%;
            float: left;
            height: 12px;
            background: #28333e;
        }
        
        .global-setup-theme-item .head {
            display: block;
            width: 80%;
            float: left;
            height: 12px;
            background: white;
        }
        
        .global-setup-theme-item .side {
            display: block;
            width: 20%;
            float: left;
            height: 40px;
            background: #28333e;
        }
        
        .global-setup-theme-item .body {
            display: block;
            width: 80%;
            float: left;
            height: 40px;
            background: #f4f5f7;
            text-align: center;
            line-height: 40px;
            font-weight: 800;
        }

    `;
        document.head.appendChild(style);
    }
}