const useUserStoreDefault  = reactive({
            token: '',
            userInfo: {},
            permissions:  [
                    "sys:user:add",
                    "sys:user:edit",
                    "sys:user:delete",
                    "sys:user:import",
                    "sys:user:export"
                ],
            menus: [
                {
                    "id": "/workspace",
                    "icon": "layui-icon-home",
                    "title": "工作空间",
                    "children": [
                        {
                            "id": "/workspace/workbench",
                            'href':'/app/admin/demos?demo=workspace/workbench',
                            //http://localhost:8787/app/admin/index/workbench
                            //http://localhost:8787/app/admin/demos?demo=workspace/workbench
                            //http://localhost:8787/app/admin/demos?demo=error/403
                            "icon": "layui-icon-util",
                            "title": "工作台"
                        },
                        {
                            "id": "/workspace/console",
                            'href':'/app/admin/demos?demo=workspace/console',
                            "icon": "layui-icon-engine",
                            "title": "控制台"
                        },
                        {
                            "id": "/workspace/analysis",
                            'href':'/app/admin/demos?demo=workspace/analysis',
                            "icon": "layui-icon-chart-screen",
                            "title": "分析页"
                        },
                        {
                            "id": "/workspace/monitor",
                            'href':'/app/admin/demos?demo=workspace/monitor',
                            "icon": "layui-icon-find-fill",
                            "title": "监控页"
                        }
                    ]
                },
                {
                    "id": "/form",
                    "icon": "layui-icon-table",
                    "title": "表单页面",
                    "children": [
                        {
                            "id": "/form/base",
                            "icon": "layui-icon-form",
                            "title": "基础表单",
                            "href": "/app/admin/demos?demo=form/base"
                        },
                        {
                            "id": "/form/intricate",
                            "icon": "layui-icon-form",
                            "title": "复杂表单",
                            "href": "/app/admin/demos?demo=form/intricate"
                        },
                        {
                            "id": "/form/step",
                            "icon": "layui-icon-form",
                            "title": "分步表单",
                            "href": "/app/admin/demos?demo=form/step"
                        }
                    ]
                },

                {
                        "id": "/table",
                        "icon": "layui-icon-align-left",
                        "title": "列表页面",
                        "children": [
                            {
                                "id": "/table/base",
                                "icon": "layui-icon-search",
                                "title": "查询列表",
                                "href": "/app/admin/demos?demo=table/base"
                            },
                            {
                                "id": "/table/card",
                                "icon": "layui-icon-file-b",
                                "title": "卡片列表",
                                "href": "/app/admin/demos?demo=table/card"
                            },
                            {
                                "id": "/table/project",
                                "icon": "layui-icon-templeate-one",
                                "title": "项目列表",
                                "href": "/app/admin/demos?demo=table/project"
                            },
                            {
                                "id": "/table/article",
                                "icon": "layui-icon-carousel",
                                "title": "文章列表",
                                "href": "/app/admin/demos?demo=table/article"
                            }
                        ]
                    },
                {
                        "id": "/result",
                        "icon": "layui-icon-template",
                        "title": "结果页面",
                        "children": [
                            {
                                "id": "/result/success",
                                "icon": "layui-icon-success",
                                "title": "成功页面",
                                "href": "/app/admin/demos?demo=result/success"
                            },
                            {
                                "id": "/result/failure",
                                "icon": "layui-icon-error",
                                "title": "失败页面",
                                "href": "/app/admin/demos?demo=result/failure"
                            }
                        ]
                    },
                {
                        "id": "/error",
                        "icon": "layui-icon-unlink",
                        "title": "异常页面",
                        "children": [
                            {
                                "id": "/error/401",
                                "icon": "layui-icon-not-found",
                                "title": "401",
                                "href": "/app/admin/demos?demo=error/401"
                            }, {
                                "id": "/error/403",
                                "icon": "layui-icon-not-found",
                                "title": "403",
                                "href": "/app/admin/demos?demo=error/403"
                            },
                            {
                                "id": "/error/404",
                                "icon": "layui-icon-not-found",
                                "title": "404",
                                "href": "/app/admin/demos?demo=error/404"
                            },
                            {
                                "id": "/error/500",
                                "icon": "layui-icon-not-found",
                                "title": "500",
                                "href": "/app/admin/demos?demo=error/500"
                            }
                        ]
                    },
                {
                        "id": "/menu",
                        "icon": "layui-icon-app",
                        "title": "菜单嵌套",
                        "children": [
                            {
                                "id": "/menu/menu1",
                                "icon": "layui-icon-component",
                                "title": "二级菜单",
                                "children": [
                                    {
                                        "id": "/menu/menu1/menu1",
                                        "icon": "layui-icon-template-one",
                                        "title": "三级菜单",
                                    },
                                    {
                                        "id": "/menu/menu1/menu2",
                                        "icon": "layui-icon-template-one",
                                        "title": "三级菜单",
                                    }
                                ]
                            },
                            {
                                "id": "/menu/menu2",
                                "icon": "layui-icon-component",
                                "title": "二级菜单",
                                "children": [
                                    {
                                        "id": "/menu/menu2/menu1",
                                        "icon": "layui-icon-template-one",
                                        "title": "三级菜单",
                                    },
                                    {
                                        "id": "/menu/menu2/menu2",
                                        "icon": "layui-icon-template-one",
                                        "title": "三级菜单",
                                    }
                                ]
                            }
                        ]
                    },
                {
                    "id": "/directive",
                    "icon": "layui-icon-test",
                    "title": "内置指令",
                    "children": [
                        {
                            "id": "/directive/index",
                            'href':'/app/admin/demos?demo=directive/index',
                            "icon": "layui-icon-template",
                            "title": "内置指令"
                        }
                    ]
                },

                {
                        "id": "/page",
                        "icon": "layui-icon-link",
                        "title": "外链页面",
                        "children": [
                            {
                                "id": "/layui-icon-layer",
                                "icon": "layui-icon-home",
                                "title": "弹层外链",
                                "type": "modal",
                                "href": "/app/admin/"
                            },
                            {
                                "id": "http://www.baidu.com",
                                "icon": "layui-icon-layouts",
                                "title": "原生跳转",
                                "type": "blank",
                                "href": "http://www.baidu.com"
                            }
                        ]
                    },
                {
                        "id": "/enrollee",
                        "icon": "layui-icon-slider",
                        "title": "个人中心",
                        "children": [
                            {
                                "id": "/enrollee/profile",
                                "icon": "layui-icon-username",
                                "title": "我的资料",
                                "href": "/app/admin/demos?demo=enrollee/profile"
                            },
                            {
                                "id": "/enrollee/message",
                                "icon": "layui-icon-email",
                                "title": "我的消息",
                                "href": "/app/admin/demos?demo=enrollee/message"
                            }
                        ]
                    },
                {
                        "id": "/system",
                        "icon": "layui-icon-set",
                        "title": "系统管理",
                        "children": [
                            {
                                "id": "/system/user",
                                "icon": "layui-icon-user",
                                "title": "用户管理",
                                "href": "/app/admin/demos?demo=system/user"
                            },
                            {
                                "id": "/system/role",
                                "icon": "layui-icon-user",
                                "title": "角色管理",
                                "href": "/app/admin/demos?demo=system/role"
                            },
                            {
                                "id": "/system/menu",
                                "icon": "layui-icon-spread-left",
                                "title": "菜单管理",
                                "href": "/app/admin/demos?demo=system/menu"
                            },
                            {
                                "id": "/system/organization",
                                "icon": "layui-icon-transfer",
                                "title": "机构管理",
                                "href": "/app/admin/demos?demo=system/organization"
                            },
                            {
                                "id": "/system/dictionary",
                                "icon": "layui-icon-read",
                                "title": "字典管理",
                                "href": "/app/admin/demos?demo=system/dictionary"
                            },
                            {
                                "id": "/system/file",
                                "icon": "layui-icon-file",
                                "title": "文件管理",
                                "href": "/app/admin/demos?demo=system/file"
                            },
                            {
                                "id": "/system/login",
                                "icon": "layui-icon-date",
                                "title": "登录日志",
                                "href": "/app/admin/demos?demo=system/login"
                            },
                            {
                                "id": "/system/option",
                                "icon": "layui-icon-survey",
                                "title": "操作日志",
                                "href": "/app/admin/demos?demo=system/option"
                            }
                        ]
                    }


            ]
        })


//localStorage.removeItem('useUserStore');//删除useUserStore缓存
//
//将配置和部分打开的页面菜单等信息存在本地缓存,以方便刷新页面后能页面保证不变
let useUserStore =localStorage.getItem('useUserStore');
// console.log(useUserStore)
useUserStore =useUserStore?JSON.parse(useUserStore) :useUserStoreDefault
// console.log(useUserStore)
localStorage.setItem('useUserStore', JSON.stringify(useUserStore));

//user信息需要从后台获取,这里只是提供一个模板,浏览器刷新页面后将重新获取(内部刷新按钮不会重新获取,可自行修改)