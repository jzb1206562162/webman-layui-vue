const GlobalMainMenu = {
    props: {
        collapse: {
            type: Boolean,
            default: false,
        }, menus: {
            type: Array,
        },selectedKey:{
            type:  [String,Number]
        }
    },

    components: {
        'global-main-menu-item': GlobalMainMenuItem
    },
    template: `
  <lay-menu
    :tree="true"
    :collapse="collapse"
    :level="appStore.level"
    :inverted="appStore.inverted"
    :theme="appStore.sideTheme"
    :selected-key="selectedKey"
    @change-selected-key="changeSelectedKey"
  >
    <global-main-menu-item :menus="menus"></global-main-menu-item>
  </lay-menu>
`,
    inject: ['appStore'],
    methods: {
        changeSelectedKey(){
            //会执行一次后再执行父组件传入事件
            // console.log('changeSelectedKey占位符GlobalMainMenu')
        }
    },

    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
	
     .layui-nav-tree * {
    font - size: 14px;
}

    .layui-nav-tree .layui-nav-item > a,
    .layui-nav-tree.inverted .layui-nav-item > a {
    padding: 3px 22px;
}

    .layui-nav-tree.inverted .layui-this > a {
    padding: 3px 16px;
}

    .layui-nav-tree .layui-nav-item > a > span {
    padding - left: 10px;
}

    .layui-nav-tree .layui-nav-item > a .layui-nav-more {
    font - size: 12px!important;
    padding: 3px 0px;
}
    `;
        document.head.appendChild(style);
    }
}