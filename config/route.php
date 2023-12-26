<?php
/**
 * This file is part of webman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link      http://www.workerman.net/
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */

use Webman\Route;
use support\Request;


Route::fallback(function(Request $request) {
    // ajax请求时返回json
    if ($request->expectsJson()) {
        return json(['code' => 404, 'msg' => '404 not found']);
    }
    // 页面请求返回404.html模版
    //    return redirect('/404.html') ;//重定向
    //    return response($request->uri() . ' not found 1' , 404);//不加载模板,直接返回源代码
    return view('/demos/error/404', ['msg' => $request->path() . '不存在'], '', 'admin')->withStatus(404);//加载模板
});