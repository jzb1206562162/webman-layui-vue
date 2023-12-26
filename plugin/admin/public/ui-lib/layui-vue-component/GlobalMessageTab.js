const GlobalMessageTab = {
    props: {
        flag: {
            type: Boolean,
            default: false
        }
    },
    template: `
  <lay-dropdown
    updateAtScroll
    ref="manualRef"
    :clickOutsideToClose="true"
    :clickToClose="false"
    placement="bottom"
  >
    <slot></slot>
    <template #content>
      <lay-tab type="brief" style="margin: 5px" v-model="currentIndex">
        <lay-tab-item :title="'通知('+informList.length+')'" id="1">
          <div style="width: 100%; height: 100%; overflow: hidden">
            <div
              class="inform-item"
              v-for="(item, index) in informList"
              :key="index"
            >
              <div class="inform-item-icon">
                <img src="../assets/messageSlot/info1.png" alt="" />
              </div>
              <div class="inform-item-text">
                <div>{{ item.title }}</div>
                <div class="inform-item-time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </lay-tab-item>
        <lay-tab-item :title="'私信('+privateLetteList.length+')'" id="2">
          <div style="width: 100%; height: 100%; overflow: hidden">
            <div
              class="inform-item privateLette-item"
              v-for="(item, index) in privateLetteList"
              :key="index"
            >
              <div class="inform-item-icon">
                <img src="../assets/messageSlot/avatar1.png" alt="" />
              </div>
              <div class="inform-item-text">
                <div>{{ item.title }}</div>
                <div class="inform-item-time">
                  {{ item.content }}
                </div>
                <div class="inform-item-time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </lay-tab-item>
        <lay-tab-item :title="'待办('+todoList.length+')'" id="3">
          <div style="width: 100%; height: 100%; overflow: hidden">
            <div
              class="inform-item todo-item"
              v-for="(item, index) in todoList"
              :key="index"
            >
              <div class="todo-title">
                <div style="flex: 1">
                  {{ item.title }}
                  <div class="inform-item-time todo-item-time">
                    {{ item.time }}
                  </div>
                </div>
                <div v-show="item.type == '未开始'" class="todo-tags">
                  <lay-tag color="#6e6e6e" variant="light">未开始</lay-tag>
                </div>
                <div v-show="item.type == '进行中'" class="todo-tags">
                  <lay-tag color="#2dc570" variant="light">进行中</lay-tag>
                </div>
                <div v-show="item.type == '即将到期'" class="todo-tags">
                  <lay-tag color="#F5319D" variant="light">即将到期</lay-tag>
                </div>
              </div>
            </div>
          </div>
        </lay-tab-item>
      </lay-tab>
    </template>
  </lay-dropdown>
`,
    data() {
        return {
            appStore: useAppStore,
            manualRef: ref(),
            informList: ref([
                {
                    img: '../assets/messageSlot/info1.png',
                    title: '您有一条新的通知',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: '../assets/messageSlot/info1.png',
                    title: '您有一条新的通知',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: '../assets/messageSlot/info1.png',
                    title: '您有一条新的通知',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: '../assets/messageSlot/info1.png',
                    title: '您有一条新的通知',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: '../assets/messageSlot/info1.png',
                    title: '您有一条新的通知',
                    time: '2021-08-09 12:00:00'
                }
            ]),
            privateLetteList: ref([
                {
                    img: 'avatar1.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: 'avatar2.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: 'avatar3.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: 'avatar4.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: 'avatar5.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                },
                {
                    img: 'avatar6.png',
                    title: '速尔 评论了 你的日志',
                    content: '写的不错，以后向你学习哦~',
                    time: '2021-08-09 12:00:00'
                }
            ]),
            todoList: ref([
                {
                    title: '张三的请假审批',
                    type: '未开始',
                    time: '张三在 08-09 12:00:00 提交的请假...'
                },
                {
                    title: '考试监管',
                    type: '进行中',
                    time: '考试监管在 08-09 12:00:00 之前打卡'
                },
                {
                    title: '注册新仓库',
                    type: '即将到期',
                    time: '需要在 08-09 12:00:00 之前完成'
                }
            ]),
            currentIndex: ref('1')
        }
    }, methods: {
        changeOpenKeys(keys) {
            this.openKeys = keys;
        },
        changeSelectedKey(key) {
            this.selectedKey = key;
        }
    },
    watch: {
        flag(newVal) {
            if (newVal) {
                this.$refs.manualRef.show();
            } else {
                this.$refs.manualRef.hide();
            }
        }
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
            .inform-item {
            box-sizing: border-box;
            display: flex;
            width: 320px;
            height: 60px;
            color: #222222;
            font-size: 14px;
            padding: 0 20px;
            border-bottom: 1px solid #f3f3f3;
        }
        
        .inform-item .inform-item-icon {
            display: inline-block;
            width: 40px;
            height: 100%;
            line-height: 60px;
            text-align: center;
        }
        
        .inform-item .inform-item-icon > img {
            width: 28px;
            height: 28px;
            vertical-align: middle;
        }
        
        .inform-item .inform-item-text {
            box-sizing: border-box;
            display: inline-block;
            flex: 1;
            padding: 10px 0 0 10px;
        }
        
        .inform-item .inform-item-text .inform-item-time {
            margin-top: 6px;
            color: #ada4a4;
            font-size: 12px;
        }

            .inform-item:hover {
            background - color: #fafafa;
        }
        
            .privateLette-item {
            height: 80px;
        }
            .todo-item {
            box - sizing: border-box;
            padding: 0 10px;
        }
            .todo-title {
            width: 100%;
            display: flex;
            line-height: 30px;
        }
            .todo-tags {
            width: 100px;
            text-align: right;
            line-height: 60px;
        }
            .todo-item-time {
            line - height: 20px;
            color: #ada4a4;
            font-size: 12px;
        }
    `;
        document.head.appendChild(style);
    },

}