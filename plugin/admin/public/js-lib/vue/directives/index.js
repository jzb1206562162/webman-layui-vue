
if (typeof directiveScriptName === 'undefined') {
    // 变量未定义,使用默认设置全部加载,若你实现了其他自定义的指令,请将指令名称写在此处;
    const  directiveScriptName=[
        'copy','throttle'
    ]
}



function loadScripts(paths, callback) {
    let loadedCount = 0;
    //自定义指令的js文件请放在此处,并且文件名必须要和指令名一致
    const  scriptPaths='/plugin/admin/public/js-lib/vue/directives/'
    function loadScript(path) {
        let script = document.createElement('script');
        script.src =scriptPaths+ path+'.js';
        script.onload = function() {
            loadedCount++;
            if (loadedCount === paths.length) {
                callback();
            }
        };
        document.head.appendChild(script);
    }

    paths.forEach(function(path) {
        loadScript(path);
    });
}

loadScripts(directiveScriptName, function() {
    console.log('已加载的自定义指令如下:');
    directiveScriptName.forEach(function(element) {
        console.log('v-'+element)
        app.directive(element,  eval(element))
    });
    app.mount("#app");
});