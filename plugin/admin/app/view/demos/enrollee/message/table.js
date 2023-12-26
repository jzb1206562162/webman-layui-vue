const tableContent = {
    template: `
  <div class="table-content">
    <lay-table
      :page="page"
      :columns="columns"
      :loading="loading"
      :default-toolbar="true"
      :data-source="dataSource"
      v-model:selected-keys="selectedKeys"
      @change="change"
      @sort-change="sortChange"
    >
      <template #status="{ row }">
        <lay-switch
          :model-value="row.status"
          @change="changeStatus($event, row)"
        ></lay-switch>
      </template>
      <template v-slot:toolbar>
        <lay-button size="sm" type="primary" @click="read">标记已读</lay-button>
        <lay-button size="sm" @click="remove">删除</lay-button>
      </template>
      <template v-slot:operator="{ row }">
        <lay-button size="xs" type="primary" @click="edit(row)"
          >编辑</lay-button
        >
        <lay-button size="xs">查看</lay-button>
      </template>
    </lay-table>
  </div>
`,
    data() {
        return {
            currentTab: ref('system'),
            messageInfo: ref({
                system: 3,
                user: 0,
                todo: 11
            }),
            loading: ref(true),
            page: reactive({current: 1, limit: 10, total: 100}),
            columns: ref([
                {title: '选项', width: '55px', type: 'checkbox', fixed: 'left'},
                {title: '编号', width: '80px', key: 'id', fixed: 'left', sort: 'desc'},
                {title: '姓名', width: '80px', key: 'name', sort: 'desc'},
                {title: '内容', width: '260px', key: 'remark'},
                {title: '时间', width: '120px', key: 'joinTime'},
                {title: '操作', width: '150px', customSlot: 'operator', key: 'operator', fixed: 'right'}
            ]),
            selectedKeys: [],

        }
    },
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        dataSource: {
            type: Array,
            default: [
                {
                    id: '1',
                    name: '张三1',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '18',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '2',
                    name: '张三2',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '3',
                    name: '张三3',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '4',
                    name: '张三4',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '5',
                    name: '张三5',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '6',
                    name: '张三6',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '7',
                    name: '张三7',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '18',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '8',
                    name: '张三8',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '9',
                    name: '张三9',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                },
                {
                    id: '10',
                    name: '张三10',
                    email: 'test@qq.com',
                    sex: '男',
                    city: '浙江杭州',
                    age: '20',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    status: true
                }
            ]
        }
    },
    methods: {
        read() {
            const newCount = this.modelValue - 1;
            this.$emit('update:modelValue', newCount);
            layer.msg('未读消息-1');
        },
        change(page) {
            console.log(page)
            this.loading = true
            setTimeout(() => {
                this.dataSource = this.loadDataSource(page.current, page.limit)
                this.loading = false
            }, 1000)
        },
        sortChange(key, sort) {
            layer.msg(
                `字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`
            )
        },
        changeStatus(isChecked, row) {
            console.log(isChecked)
            console.log(row)
            this.dataSource.forEach((item) => {
                if (item.id === row.id) {
                    layer.msg('Success', {icon: 1}, () => {
                        item.status = isChecked
                    })
                }
            })
        },
        remove() {
            layer.msg(this.selectedKeys, {area: '50%'})
        },
        loadDataSource(page, pageSize) {
            var response = []
            var startIndex = (page - 1) * pageSize + 1
            var endIndex = page * pageSize
            for (var i = startIndex; i <= endIndex; i++) {
                response.push({
                    id: `${i}`,
                    age: '18',
                    sex: '男',
                    name: `张三${i}`,
                    email: 'test@qq.com',
                    remark: '花开堪折直须折,莫待无花空折枝.',
                    joinTime: '2022-02-09',
                    city: '浙江杭州',
                    status: true
                })
            }
            return response
        },
        async edit(row) {
            layer.msg(row, {area: '50%'})
        }
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
          .table-content {
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
                background-color: #fff;
            }
                .option-icon {
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        let This = this;
        setTimeout(() => {
            This.loading = false
        }, 1000)
    }
}