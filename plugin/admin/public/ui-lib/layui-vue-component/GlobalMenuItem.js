const GlobalMenuItem = {
    props: {
        menus: {
            type: Object
        }
    },
    template: `
        <template v-for="(menu, index) in menus" :key="index">
            <template v-if=" Array.isArray(menu.children) && menu.children.length !== 0">
                <lay-sub-menu :id="menu.id">
                    <template #icon>
                        <lay-icon :type="menu.icon"></lay-icon>
                    </template>
                    <template #title>{{ menu.title }}</template>
                    <global-menu-item :menus="menu.children"></global-menu-item>
                </lay-sub-menu>
            </template>
            <template v-else>
                <lay-menu-item :id="menu.id"  >
                    <template #icon>
                        <lay-icon :type="menu.icon"></lay-icon>
                    </template>
                    <template #title><span :title=" menu.herf">{{ menu.title }}</span></template>
                </lay-menu-item>
            </template>
        </template>
        `,

}