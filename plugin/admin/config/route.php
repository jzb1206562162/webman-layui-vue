<?php


use plugin\admin\app\controller\AccountController;
use plugin\admin\app\controller\DictController;
use support\Request;
use Webman\Route;

Route::any('/app/admin/account/captcha/{type}', [AccountController::class, 'captcha']);

Route::any('/app/admin/dict/get/{name}', [DictController::class, 'get']);

Route::fallback(function (Request $request) {
    // ajax请求时返回json
    if ($request->expectsJson()) {
        return json(['code' => 404, 'msg' => '404 not found']);
    }
    // 页面请求返回404.html模版
//    return redirect('/app/admin/demos/error/404.html') ;//重定向
    return view('/demos/error/404', ['msg' => $request->path().'不存在'],'','admin')->withStatus(404);//加载模板
}, 'admin');

Route::any('/plugin/admin/public/[{path:.+}]', function (Request $request, $path = '') {
    // 静态文件目录
    $static_base_path = base_path() . '/plugin/admin/public';
    // 安全检查，避免url里 /../../../password 这样的非法访问
    if (strpos($path, '..') !== false || !$path) {
        return view('demos/error/403',[],'','admin')->withStatus(403);
    }
    // 文件
    $file = "$static_base_path/$path";
    if (!is_file($file)) {
        return view('demos/error/404',[],'','admin')->withStatus(404);
    }
    return response('')->withFile($file);
});
Route::any('/plugin/admin/app/view/[{path:.+}]', function (Request $request, $path = '') {
    // 静态文件目录
    $static_base_path = base_path() . '/plugin/admin/app/view';
    // 安全检查，避免url里 /../../../password 这样的非法访问
    if (strpos($path, '..') !== false || !(trim($path)) || stripos($path, 'html') !== false) {
            return view('demos/error/403',[],'','admin')->withStatus(403);
    }
    // 文件
    $file = "$static_base_path/$path";
    if (!is_file($file)) {
            return view('demos/error/404',['msg'=>$path.' 不存在'],'','admin')->withStatus(404);
    }
    return response('')->withFile($file);
});