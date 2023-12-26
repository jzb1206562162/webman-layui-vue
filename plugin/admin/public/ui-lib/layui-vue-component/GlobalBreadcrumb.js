const GlobalBreadcrumb = {
    template: `
    <lay-breadcrumb>
        <lay-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbInfo" :key="index">
            {{ breadcrumb.title }}
        </lay-breadcrumb-item>
    </lay-breadcrumb>
`, data() {return { }},
    inject: ['breadcrumbInfo']
}