const GlobalSetup = {
    template: `
  <lay-layer
    :title="false"
    :closeBtn="false"
    type="drawer"
    area="300px"
    v-model="visible"
  >
    <div class="global-setup">
      <div class="global-setup-title">Overall style</div>
      <global-setup-theme v-model="appStore.sideTheme"></global-setup-theme>
      <global-setup-theme
        v-model="appStore.subfieldPosition"
        :options="groupOptions"
        :disabled="!appStore.subfield"
      ></global-setup-theme>
      <global-color
        v-model="appStore.themeVariable['--global-primary-color']"
      ></global-color>
      <lay-line></lay-line>
      <global-setup-item label="多选项卡">
        <lay-switch v-model="appStore.tab" size="xs"></lay-switch>
      </global-setup-item>
          <global-setup-item label="菜单层级">
              <lay-switch v-model="appStore.level" size="xs"></lay-switch>
          </global-setup-item>
      <global-setup-item label="菜单反选">
        <lay-switch v-model="appStore.inverted" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单折叠">
        <lay-switch v-model="appStore.collapse" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="手风琴">
        <lay-switch v-model="appStore.accordion" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="夜间模式">
        <lay-switch
          v-model="appStore.theme"
          onswitch-value="dark"
          unswitch-value="light"
          size="xs"
        ></lay-switch>
      </global-setup-item>
      <global-setup-item label="侧边标题">
        <lay-switch v-model="appStore.logo" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="灰色模式">
        <lay-switch v-model="appStore.greyMode" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="面包屑">
        <lay-switch v-model="appStore.breadcrumb" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="菜单分栏">
        <lay-switch v-model="appStore.subfield" size="xs"></lay-switch>
      </global-setup-item>
      <global-setup-item label="选项卡风格">
        <lay-radio-group
          name="action"
          v-model="appStore.tagsTheme"
        >
          <lay-radio-button size="xs" value="concise">样式一</lay-radio-button>
          <lay-radio-button size="xs" value="underpainting">
            样式二
          </lay-radio-button>
          <lay-radio-button size="xs" value="designer">样式三</lay-radio-button>
        </lay-radio-group>
      </global-setup-item>
      <div style="padding: 15px">
        <lay-button border="green" border-style="dashed" :fluid="true" @click="resetTheConfiguration">重置配置</lay-button>
      </div>
    </div>
  </lay-layer>
`,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        'global-setup-item': GlobalSetupItem,
        'global-setup-theme': GlobalSetupTheme,
        'global-color': GlobalColor,
    },
    data() {
        return {
            groupOptions: ref([
                {
                    logo: '#28333e',
                    head: 'white',
                    side: '#28333e',
                    body: '#f4f5f7',
                    value: 'side'
                },
                {
                    logo: '#28333e',
                    head: '#28333e',
                    side: 'white',
                    body: '#f4f5f7',
                    value: 'head'
                }
            ]),
        }
    },
    inject: ['appStore','visible'],
    methods:{
        resetTheConfiguration(){
            localStorage.removeItem('useAppStore');//删除useAppStore缓存
            let defaultSeting ={
                level: true,//子菜单背景
                inverted: true,//菜单反选
                theme: 'light',//主题
                breadcrumb: true,//是否开启顶部面包屑
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
                tab: true,//开启或关闭tab
            }
            Object.assign(this.appStore, defaultSeting);
            layer.msg('重置成功');
        }
    },
    watch: {
        'appStore.themeVariable': {
            immediate: true,
            deep: true,
            handler() {
                this.appStore.themeVariable['--global-checked-color'] = this.appStore.themeVariable['--global-primary-color'];
            }
        },
        'props.modelValue': {
            handler(val) {
                this.visible = val;
            }
        }
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
	
          .global-setup {
    padding: 10px;
}

    .global-setup-title {
    font - size: 13px;
    margin-bottom: 10px;
    padding: 10px 10px 0px 10px;
}
    .global-setup .layui-colorpicker {
    margin - right: 10px;
}
    `;
        document.head.appendChild(style);
    }
}