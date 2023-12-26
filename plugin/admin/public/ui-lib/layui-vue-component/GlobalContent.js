const GlobalContent = {
    template: `
      <div class="global-content" :class="{ 'has-tab': appStore.tab }">
          <iframe :ref="'myIframe' + id" :id="id" :src="src" frameborder="0" scrolling="auto" style="overflow:hidden;" width="100%" height="100%"  v-if="show"></iframe>
           <lay-loading style="height: 100%;" :type="2" v-else ></lay-loading>
      </div>`,
    props: {
        id: {
            type: [String, Number],
            default: 0 // 设置count的默认值为0
        },
        src: {
            type: String,
            default: '/index/index' // 设置count的默认值为0
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    methods: {},
    inject: ['appStore'],

    watch: {
        'appStore'(newVal, oldVal) {
            // // 当 useAppStore 的值发生变化时，执行相应的操作
            // console.log('New appStore value:', newVal);
            // console.log('old appStore value:', oldVal);
        }
    },

    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
       
    `;
        document.head.appendChild(style);
    }
}