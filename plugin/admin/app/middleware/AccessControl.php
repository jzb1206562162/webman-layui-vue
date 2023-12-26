<?php
namespace plugin\admin\app\middleware;

use plugin\admin\api\Auth;
use ReflectionException;
use support\exception\BusinessException;
use Webman\Http\Request;
use Webman\Http\Response;
use Webman\MiddlewareInterface;

class AccessControl implements MiddlewareInterface
{
    /**
     * @param Request $request
     * @param callable $handler
     * @return Response
     * @throws ReflectionException|BusinessException
     */
    public function process(Request $request, callable $handler): Response
    {
        $stime = microtime(true);
        $controller = $request->controller;
        $action = $request->action;

        $code = 0;
        $msg = '';
        if (!Auth::canAccess($controller, $action, $code, $msg)) {
            if ($request->expectsJson()) {
                $response = json(['code' => $code, 'msg' => $msg, 'data' => []]);
            } else {
                if ($code === 401) {
                    return redirect('/app/admin');
                } else {
                    $request->app = '';
                    $request->plugin = 'admin';
                    $response = view('common/error/403')->withStatus(403);
                }
            }

        } else {
            $response = $request->method() == 'OPTIONS' ? response('') : $handler($request);
            $content =   $response->rawBody();
            $array =json_decode($content,true) ;
            if (is_array($array)){
                $array['AllTime'] = round(microtime(true)- $stime,4) ;
                $response->withBody(json_encode($array,JSON_UNESCAPED_UNICODE));
            }else{
//                var_dump( $content) ;
            }
        }

        return $response;

    }

}