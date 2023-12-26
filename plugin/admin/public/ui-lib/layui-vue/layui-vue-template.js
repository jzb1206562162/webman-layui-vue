/**
 * 深度克隆,以阻止对 克隆对象 的修改操作导致 原始对象被 修改;
 * @类似于a={},b=a,b.d=1 这种操作会导致a也会变为{d:1},
 * @使用了此函数b=deepClone(a)则不会出现这种情况
 * @param obj
 * @returns {any}
 */
function deepClone(obj) {
    return typeof(obj)=='object'?JSON.parse(JSON.stringify(obj)):'obj';
}

let pageHeight;
// let pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
window.onload = function() {
     pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 你的其他代码...
}

/**
 *删除数据并刷新数据
 * @param url  接口
 * @param data 删除参数
 * @param This 即this对象,请务必传递 this
 * @param flushedFunction 刷新数据 函数名 一般是 onLoad,可自定义
 * @param flushedFunctionData 是否重置刷数条件,若为true,则重置为默认刷新条件,一般为false,不重置
 * @param title 弹窗标题
 * @param msg 弹窗信息
 */
function deleteData(url, data, This, flushedFunction = 'onLoad', flushedFunctionData = false, title = '删除警告', msg = '确定要删除此条数据吗') {
    layer.confirm(msg, {
        title: title, btn: [{
            text: '确定', callback: async function (id) {
                let res = await ajax(url, data, true);
                if (res) {
                    //有参数执行带参数刷新,没有参数直接刷新
                    flushedFunctionData !== false ? This[flushedFunction](flushedFunctionData) : This[flushedFunction]();
                    layer.close(id);
                }
            }
        }, {
            text: '取消', callback: function (id) {
                layer.close(id);
            }
        }
        ]
    })
}

/**
 *ajax访问,返回数据体,预处理错误信息0为成功,1或者其他都是失败,想要控制内容用这个,其他大部分情况都用下面的post或者get
 * @param url 链接
 * @param data 参数
 * @param showLoading 展示数据加载状态提示 ,默认为true
 * @param showSuccessMsg 展示成功提示信息 默认false不展示 备注:失败提示永久在且当rawData=true时这个设置无效
 * @param ajaxtype 传输方式,post,get
 * @param rawData 以原始数据返回,不进行任何预处理;默认为false,进行预处理
 * @returns {Promise<*>}
 */
async function ajax(url, data = {}, showLoading = true, showSuccessMsg = false, ajaxtype = 'post', rawData = false,) {
    let rr;
    let load = false
    if (showLoading) load = layer.load(1)

    await axios[ajaxtype](url, data).then(function (res) {
            if (load) layer.close(load);
            res = res.data
            if (rawData) {
                rr = res;
            } else {
                if (res.code === 0) {
                    if (showSuccessMsg) layer.msg(res.msg, {time: 1000, icon: 1});
                    rr = res;
                } else if (res.code >= 1) {
                    layer.msg(res.msg, {icon: 2, time: 3000})
                    rr = false;
                }
            }

        }
    ).catch(function (error) {
        if (load) layer.close(load);
        layer.msg('网页连接失败,请稍候重试', {icon: 2, time: 3000})
        rr = false;
    });

    return rr;
}

/**
 *ajax post访问,直接返回数据体,
 * @param url 链接
 * @param data 参数
 * @param showLoading 展示数据加载状态提示 ,默认为true
 * @returns {Promise<*>}
 */
async function post(url, data = {},  showLoading = true) {
    return await ajax(url,data,showLoading,false,'post',true);
}
/**
 *ajax get访问,直接返回数据体,
 * @param url 链接
 * @param showLoading 展示数据加载状态提示 ,默认为true
 * @param data   数组或对象格式数据,追加到url后面的
 * @returns {Promise<*>}
 */
async function get(url, showLoading = true,data={},) {
    function appendParamsToUrl(url, params) {
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        return url + (url.indexOf('?') === -1 ? '?' : '&') + queryString;
    }
    url = appendParamsToUrl(url, data);
    return await ajax(url, data,showLoading,false,'get',true);
}

/**
 * 文件下载
 * @param FileUrl  rul路径
 */

function downloadFile(FileUrl) {
    var link = document.createElement('a');
    link.href = FileUrl;
    // 通过split函数和pop函数获取URL链接末尾的文件名
    var fileName = FileUrl.split('/').pop();
    // 如果文件名为空或者不包含点（.），说明URL链接末尾不是文件名，就使用时间戳作为文件名
    if (fileName === '' || fileName.indexOf('.') === -1) {
        fileName = 'image_' + Date.now();
    }
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * 图片弹出框
 * @param urldata 图片链接,url 字符串或者 数组
 * @param index  当为数组时,当前展示的图片序号
 * @param thumb  当为数组时,是否展示底部缩略图.默认false
 */
function showPhotos(urldata,index=0,thumb=false){

    if (typeof urldata === 'string') {
        layer.photos({
            imgList: [{src: urldata}]
        })
    } else {
        let result = [];
        for (let i = 0; i < urldata.length; i++) {
            if(thumb){
                result.push({src: urldata[i], alt: '第' + (i + 1) + '张',thumb: urldata[i]});
            }     else{
                result.push({src: urldata[i], alt: '第' + (i + 1) + '张'});
            }
        }
        let arr;
        const firstN = result.slice(0, index);
        arr = result.slice(index);
        arr.push(...firstN);
        layer.photos({imgList: arr});
    }


}