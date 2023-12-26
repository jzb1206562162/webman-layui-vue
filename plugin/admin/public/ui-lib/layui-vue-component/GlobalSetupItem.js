const GlobalSetupItem = {
    template: `
  <div class="global-setup-item">
    <div class="global-setup-item-label">
      {{ label }}
    </div>
    <div class="global-setup-item-extra">
      <slot></slot>
    </div>
  </div>
`,
    props: {
        label: {
            type: String,
            default: '标题',
        },
    },
    mounted() {
        const style = document.createElement('style');
        style.innerHTML = `
            .global-setup-item {
                height: 50px;
                line-height: 50px;
                padding: 0px 15px;
            }
            .global-setup-item-label {
                float: left;
                font-size: 14px;
            }
            .global-setup-item-extra {
                float: right;
            }
            `;
        document.head.appendChild(style);
    }
}