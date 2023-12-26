<?php

namespace plugin\admin\app\controller;

use support\exception\BusinessException;
use support\Request;
use support\Response;
use Throwable;

class DemosController extends Crud
{

    /**
     * demo示例页
     * @param Request $request
     * @return Response
     * @throws BusinessException|Throwable
     */
    public function index(Request $request): Response
    {

        $path=  run_path('plugin/admin/app/view/demos/'.$request->get('demo'));


        $path1 = $path.'.html';

        if (is_file($path1)) {
            return view('demos/'. $request->get('demo'));
        } elseif (is_dir($path) && is_file($path.'/index.html') ) {
            return view('demos/'. $request->get('demo').'/index');
        } else {
            return view('demos/error/404',['msg'=>'demos/'.$request->get('demo').'页面不存在']);
        }
    }



}