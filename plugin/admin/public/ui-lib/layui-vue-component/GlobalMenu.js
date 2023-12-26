const GlobalMenu = {
    //直接传递的写在props里占位,也仅仅是占位,不代表任何值,值是上层传递过来的,且为只读,无法直接修改,想修改见下方示例
    props: {
        collapse: {
            type: Boolean
        },openKeys: {
            type: [String,Array]
        }, menus: {
            type:  Array
        },selectedKey:{
            type:  [String,Number]
        }
    },
    template: `
  <lay-menu
    :tree="true"
    :collapse="collapse"
    :level="appStore.level"
    :inverted="appStore.inverted"
    :theme="appStore.sideTheme"
    :open-keys="openKeys"
    :selected-key="selectedKey"
    @change-open-keys="changeOpenKeys"
    @change-selected-key="changeSelectedKey"
  >
    <global-menu-item :menus="menus"></global-menu-item>
  </lay-menu>
`,
    data() {return {}},
    inject: ['appStore'],//非直接传递的参数用inject,才能保证全局一致性
    methods: {
        changeOpenKeys(keys) { //此事件父组件没传递,子组件将会执行此事件
            // console.log('changeOpenKeys')
            this.$emit('update:openKeys', keys);//修改props里由父组件上层传来的属性需要像这样才能改
            //this.openKeys=keys  错误示范 子组件这样修改props是不可以的,因为props只读,类似于计算属性,它是根据上层的值得到的,只能修改上层值间接修改它!!!!
            //this.appStore.level=false  从inject传递过来的全局数据可以这样修改
            //修改props中的属性需要父组件监听了方法才行,或者使用双向绑定,见demos/enrollee/message/index.html和table.js
            //若data中自定义了属n:m,也能用this.n=mm 进行修改
        },
        changeSelectedKey(){//父组件传入了事件, 但仍会执行一次后再执行父组件传入事件,
            // console.log('changeSelectedKey占位符GlobalMenu')
        }

    },
    components: {
        //本组件加载其它组件
        'global-menu-item': GlobalMenuItem
    },
    mounted() {
        // 组件加载css方式
        //注意,某些会被for循环或foreach循环内部使用的组件,请尽量避免在被循环的组件内设置css,会导致css生成多次;
        //举例:若a组件有for循环,循环内加载b组件,请勿在b组件内自定义css ,而是在a组件内用class给b设置css

        const style = document.createElement('style');
        style.innerHTML = `
         .layui-nav-tree * {
          font-size: 14px;
        }
        
        .layui-nav-tree .layui-nav-item > a,
        .layui-nav-tree.inverted .layui-nav-item > a {
          padding: 3px 22px;
        }
        
        .layui-nav-tree.inverted .layui-this > a {
          padding: 3px 16px;
        }
        
        .layui-nav-tree .layui-nav-item > a > span {
          padding-left: 10px;
        }
        
        .layui-nav-tree .layui-nav-item > a .layui-nav-more {
          font-size: 12px!important;
          padding: 3px 0px;
        }
    `;
        document.head.appendChild(style);
    }

}