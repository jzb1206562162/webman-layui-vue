//基础配置,全局缓存
const useAppStoreDefault = reactive({
    logo: true,
    logoTitle:'Webman Admin',
    logoImage:'/plugin/admin/public/img/logo.png',
    level: true,//子菜单背景
    inverted: true,//菜单反选
    locale: "zh_CN",//语言
    theme: 'light',//主题
    breadcrumb: true,//是否开启顶部面包屑
    breadcrumbInfo: [//面包屑内容 示例
        {
            "id": "/workspace/workbench",
            "icon": "layui-icon-home",
            "title": "工作台",
        },
    ],
    sideWidth: "220px",//侧边菜单栏宽度
    sideTheme: 'light',//侧边菜单主题色 dark黑暗  light明亮
    collapse: false,//菜单折叠,左右方向
    subfield: false,//菜单分栏,主菜单和二三级菜单分开
    subfieldPosition: "side",//主菜单位置,在左侧side还是在顶部head

    greyMode: false,//灰色模式
    accordion: true,//手风琴  //即一次只能打开一个主菜单,其他主菜单会折叠, 设置为false则不会自动折叠
    tagsTheme: 'concise',//tab标签主题 concise  underpainting  designer
    themeVariable: reactive({   //主题色
        "--global-checked-color": "#5fb878",
        "--global-primary-color": "#009688",
        "--global-normal-color": "#1e9fff",
        "--global-danger-color": "#ff5722",
        "--global-warm-color": "#ffb800",

    }),
    openKeys: ([]),//菜单展开项id,是数组,可同时展开多项
    mainSelectedKey: ("/workspace/workbench"),//主菜单选中项id,字符串,只有一个
    selectedKey: ('/workspace/workbench'),//次菜单选中项id,字符串,只要一个
    currentPath:('/workspace/workbench'), //tab默认选中id
    tab: true,//开启或关闭tab
    maxtabs:10,//最大标签数
    tabs: ([
        {id: '/workspace/workbench',href:'/app/admin/index/workbench', title: '工作台', closable: false},//closable禁止关闭,仅第一项需要其他都不需要
    ]),

});
// localStorage.removeItem('useAppStore');//删除useAppStore缓存
//
//将配置和部分打开的页面菜单等信息存在本地缓存,以方便刷新页面后能页面保证不变
let useAppStore =localStorage.getItem('useAppStore');
// console.log(useAppStore)
useAppStore =useAppStore?JSON.parse(useAppStore) :useAppStoreDefault
// console.log(useAppStore)
localStorage.setItem('useAppStore', JSON.stringify(useAppStore));


//计算当前本地缓存大小,注意控制在5Mb以内
function getsTheMemoryFootprint(){
    const keys = Object.keys(localStorage);
    let totalSize = 0;
    for (let i = 0; i < keys.length; i++) {
        const value = localStorage.getItem(keys[i]);
        totalSize += value ? value.length * 2 : 0; // 乘以2是因为JavaScript中字符串使用UTF-16编码，每个字符占用2个字节
    }
// console.log(`localStorage占用内存大小：${totalSize} 字节`);
    const totalSizeInMB = (totalSize / (1024 * 1024)).toFixed(3); // 将字节转换为MB，并保留两位小数
    console.log(`localStorage占用内存大小：${totalSizeInMB} MB`);
}