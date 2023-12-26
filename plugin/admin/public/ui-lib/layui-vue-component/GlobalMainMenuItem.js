const GlobalMainMenuItem = {
  props: {
    menus: {
      type: Object,
    },
  },
  template: `
  <template v-for="(menu, index) in menus" :key="index">
    <lay-menu-item :id="menu.id">
      <template #icon>
        <lay-icon :type="menu.icon"></lay-icon>
      </template>
      <template #title>{{ menu.title }}</template>
    </lay-menu-item>
  </template>
`,
}