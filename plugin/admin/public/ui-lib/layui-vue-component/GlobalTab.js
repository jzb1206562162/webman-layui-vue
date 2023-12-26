const GlobalTab = {
    template: `
  <div class="global-tab" ref="container" @contextmenu.prevent="handleRightClick" > 
    <lay-tab :modelValue="currentPath" :allowClose="true" @change="changeTab" @close="close" > 
      <template :key="tab" v-for="tab in tabs">
        <lay-tab-item :id="tab.id" :title="tab.title" :closable="tab.closable" >
          <template #title >
              <span class="dot"></span>
                {{ tab.title }}
            
          </template>
           <global-content :id="tab.id" :src="tab.href" :show="tab.show"></global-content>
        </lay-tab-item>
      </template>
    </lay-tab>
    <lay-dropdown>
      <lay-icon type="layui-icon-down" :class=" appStore.tagsTheme == 'designer' ? 'designer-last-icon' : ''"></lay-icon>
      <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeAll">关闭全部</lay-dropdown-menu-item >
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeOther">关闭其他</lay-dropdown-menu-item >
        </lay-dropdown-menu>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item @click="closeCurrent" >关闭当前</lay-dropdown-menu-item>
        </lay-dropdown-menu>
        <lay-dropdown-menu>
                  <lay-dropdown-menu-item @click="aNewTabOpens" >新标签打开</lay-dropdown-menu-item>
        </lay-dropdown-menu>
      </template>
    </lay-dropdown>
    
    <div v-if="contextMenuVisible" class="layui-dropdown-content layui-anim layui-anim-upbit" style=" min-width: 94.2014px;" :style="{top: contextMenuTop + 'px', left: contextMenuLeft + 'px'}">
        <ul class="layui-menu layui-dropdown-menu">
            <li class="" style="" @click="closeCurrent"><span class="layui-menu-body-title"><!---->关闭当前</span><!----></li>
            <li class="" style="" @click="closeAll"><span class="layui-menu-body-title"><!---->关闭全部</span><!----></li>
            <li class="" style="" @click="closeOther"><span class="layui-menu-body-title"><!---->关闭其他</span><!----></li>
            <li class="" style="" @click="aNewTabOpens"><span class="layui-menu-body-title"><!---->新标签打开</span><!----></li>
        </ul>
    </div>
  </div>
`,
    components: {
        'global-content': GlobalContent
    },
    data() {
        return {
            contextMenuVisible: false,
            contextMenuTop: 0,
            contextMenuLeft: 0,
            setTimeout:{}
        }
    },
    inject: ['appStore', 'currentPath', 'tabs', 'to'],
    methods: {
        handleRightClick(event) {
            clearTimeout(this.setTimeout );
            console.log('key')
            // 阻止浏览器的默认右键菜单
            event.preventDefault();
            this.contextMenuVisible = true;
            const rect = this.$refs.container.getBoundingClientRect();
            this.contextMenuTop = event.clientY - rect.top;
            this.contextMenuLeft = event.clientX - rect.left;
            this.contextMenuVisible = true;
            // 设置弹窗的自动隐藏
         this.setTimeout =   setTimeout(() => {
                this.contextMenuVisible = false;
            }, 5000); // 2 秒后自动隐藏弹窗



        },
        changeTab(key) {
            this.to(key)
            console.log(key)
        },
        close(id) {
            this.tabs =this.appStore.tabs= this.tabs.filter((ele) => ele.id !== id);
        },
        closeAll() {
            this.tabs  =this.appStore.tabs= this.tabs.filter((ele) => ele.closable === false);
            this.to(this.tabs[0].id);
            this.contextMenuVisible = false;
        }, closeOther() {
            this.tabs  =this.appStore.tabs= this.tabs.filter(
                (ele) => ele.closable === false || ele.id === this.currentPath
            );
            this.contextMenuVisible = false;
        }, closeCurrent() {
            this.tabs  =this.appStore.tabs= this.tabs.filter(
                (ele) => ele.id !== this.currentPath ||  ele.closable === false
            );
            this.to(this.tabs[0].id);
            this.contextMenuVisible = false;
        },aNewTabOpens(){
            console.log( this.currentPath)
            console.log( this.tabs)
            let targetTitle =  this.tabs.find(item => item.id === this.currentPath)?.href;
            console.log(targetTitle); // 输出：'1311'
            window.open(targetTitle)
            this.contextMenuVisible = false;

        }
    },

    mounted() {

        const style = document.createElement('style');
        style.innerHTML = `
      .global-tab {
          display: flex;
          position: relative;
          box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
          border-top: 1px solid whitesmoke;
          z-index: 999;
        }
   
        .global-tab .layui-tab {
          flex-grow: 1;
          width: calc(100% - 40px);
        }
        
        .global-tab .layui-tab .layui-tab-bar {
          border: none;
          border-left: 1px solid whitesmoke;
        }
        
        .global-tab .layui-tab .layui-tab-bar.prev {
          border-left: none;
        }
        .global-tab   {
            height:99.9%
         }
         .global-tab .layui-tab  {
            height:99.8%
         }
         .global-tab  .layui-tab  .layui-tab-content .layui-tab-item {
          height:99.9%
         }
        .global-tab > i {
          width: 40px;
          background: white;
          height: 100%;
          line-height: 40px;
          text-align: center;
          border-left: 1px solid whitesmoke;
          position: absolute;
          right: 0px;
          height: 40px;
          color: red;
          z-index: 999;
        }
        
        .global-tab .layui-tab .dot {
          display: inline-block;
          background-color: whitesmoke;
          margin-right: 8px;
          border-radius: 50px;
          height: 8px;
          width: 8px;
        }
        
        .global-tab .layui-tab .layui-this .dot {
          background-color: var(--global-primary-color);
        }
        
        .global-tab .layui-tab .layui-tab-close:hover {
          background: transparent !important;
          color: #e2e2e2 !important;
        }
        .designer {
          display: flex;
          width: calc(100% - 15px);
         
          position: relative;
          font-size: 14px;
          color: dimgray;
          cursor: pointer;
           box-shadow: unset;
          z-index: 999;
        }
          .designer  .layui-tab .layui-tab-bar {
            height: 32px;
            line-height: 32px;
            margin-top: 5px;
          }
        
           .designer .layui-tab .layui-tab-bar.prev {
            border-left: none;
            height: 32px;
            line-height: 32px;
            margin-top: 5px;
          }
        
         
          .designer  .designer-tab {
            display: inline-block;
            flex-grow: 1;
            width: 100%;
            padding-left: 15px;
          }
           .designer  .designer-tab-item {
            display: inline-block;
            height: 32px !important;
            line-height: 32px !important;
            padding: 0px 10px;
            margin-top: 5px;
            background-color: #fff;
            border-radius: 4px;
            margin-right: 5px;
          }
            .designer .dot {
            display: inline-block;
            background-color: whitesmoke;
            margin-right: 8px;
            border-radius: 50px;
            height: 8px;
            width: 8px;
          }
        
         .designer    .designer-close {
            position: relative;
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 20px;
            margin-left: 8px;
            top: 1px;
            text-align: center;
            font-size: 14px;
            color: var(--global-neutral-color-8);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
          }
        
        .dot-this {
          background-color: var(--global-primary-color) !important;
        }
        .designer-last-icon {
          width: 32px !important;
          height: 32px !important;
          background: white;
          margin-top: 5px;
          line-height: 32px !important;
          text-align: center;
          border-radius: 4px;
        }
        .global-content {
            height: 99.9%;
        }
        .layui-loading-spinning{
            background-color:#F6F2F2
        }
        
        
        .global-content::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        .global-content::-webkit-scrollbar-thumb {
            border - radius: 10px;
            background-color: #e2e2e2;
        }
      }
    `;
        document.head.appendChild(style);
    }
};