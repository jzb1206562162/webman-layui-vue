<?php

namespace plugin\admin\app\controller;

use plugin\admin\app\common\Util;
use plugin\admin\app\model\User;
use support\exception\BusinessException;
use support\Request;
use support\Response;
use Throwable;
use Workerman\Worker;
use yzh52521\EasyHttp\Http;

class IndexController extends Crud
{

    /**
     * 无需登录的方法
     * @var string[]
     */
    protected $noNeedLogin = ['index'];

    /**
     * 不需要鉴权的方法
     * @var string[]
     */
    protected $noNeedAuth = ['dashboard'];

    /**
     * 后台主页
     * @param Request $request
     * @return Response
     * @throws BusinessException|Throwable
     */
    public function index(Request $request): Response
    {
        clearstatcache();
        if (!is_file(base_path('plugin/admin/config/database.php'))) {
            return raw_view('index/install');
        }
        $admin = admin();
        if (!$admin) {
            return think_view('account/login');
        }
        return think_view('index/index');
    }

    /**
     * 仪表板
     * @param Request $request
     * @return Response
     * @throws Throwable
     */
    public function dashboard(Request $request): Response
    {
        return think_view('demos/workspace/workbench/index');
        // 今日新增用户数
        $today_user_count = User::where('created_at', '>', date('Y-m-d') . ' 00:00:00')->count();
        // 7天内新增用户数
        $day7_user_count = User::where('created_at', '>', date('Y-m-d H:i:s', time() - 7 * 24 * 60 * 60))->count();
        // 30天内新增用户数
        $day30_user_count = User::where('created_at', '>', date('Y-m-d H:i:s', time() - 30 * 24 * 60 * 60))->count();
        // 总用户数
        $user_count = User::count();
        // mysql版本
        $version = Util::db()->select('select VERSION() as version');
        $mysql_version = $version[0]->version ?? 'unknown';

        $day7_detail = [];
        $now = time();
        for ($i = 0; $i < 7; $i++) {
            $date = date('Y-m-d', $now - 24 * 60 * 60 * $i);
            $day7_detail[substr($date, 5)] = User::where('created_at', '>', "$date 00:00:00")
                ->where('created_at', '<', "$date 23:59:59")->count();
        }
        $data=[
            'today_user_count' => $today_user_count,
            'day7_user_count' => $day7_user_count,
            'day30_user_count' => $day30_user_count,
            'user_count' => $user_count,
            'php_version' => PHP_VERSION,
            'workerman_version' =>  Worker::VERSION,
            'webman_version' => Util::getPackageVersion('workerman/webman-framework'),
            'admin_version' => config('plugin.admin.app.version'),
            'mysql_version' => $mysql_version,
            'os' => PHP_OS,
            'day7_detail' => array_reverse($day7_detail),
        ];
        return $this->success('',$data) ;
    }

    /**
     * 升级layui-vue 版本
     * @param Request $request
     * @return Response
     */
    public function changeVersion(Request $request): Response
    {
        $num=get('num'); $pattern = '/layui-vue@(\d+\.\d+\.\d+)/';
        $layuiPath=run_path('plugin/admin/public/ui-lib/layui-vue/');
        $historyFolderPath = $layuiPath.'history/';
        $files = scandir($layuiPath);
        foreach ($files as $file) {
            $searchStr = "layui-vue@";
            if (strpos($file, $searchStr) !== false) {
                if($num == 0){
                    if(strpos($file, '.js') !== false){
                        $response = Http::withRedirect([
                            'max'             => 5,
                            'strict'          => false,
                            'referer'         => true,
                            'protocols'       => ['https'],
                            'track_redirects' => true
                        ])->withVerify(false)->get('https://unpkg.com/@layui/layui-vue/lib/index.css');
                        $head=$response->headers() ;
                        $versionUrl=end($head['X-Guzzle-Redirect-History']);
                        preg_match($pattern, $versionUrl, $matches);
                        $version=$matches[1];
                        return success('当前版本:'.str_replace('.js','',$file).';最新版本'.$version);
                    }
                    continue ;
                }
                if($num == 1){
                    echo "文件名包含layui-vue@".$file."\n";
                    $oldFilePath = $layuiPath . $file;
                    $newFilePath = $historyFolderPath . '/' . $file;
                    rename($oldFilePath, $newFilePath);
                }
            }
        }
        if($num == 0){
            return error('未获取到版本号');
        }
        if($num == 1){
            $urls=[
               'css'=>'https://unpkg.com/@layui/layui-vue/lib/index.css',
                'js'=>'https://unpkg.com/@layui/layui-vue'
            ];

            foreach ($urls as $key=>$url){
                $response = Http::withRedirect([
                    'max'             => 5,
                    'strict'          => false,
                    'referer'         => true,
                    'protocols'       => ['https'],
                    'track_redirects' => true
                ])->withVerify(false)->get($url);
                $head=$response->headers() ;
                $versionUrl=end($head['X-Guzzle-Redirect-History']);
                preg_match($pattern, $versionUrl, $matches);
                $version=$matches[1];
                $filename = "layui-vue@" . $version . ".".$key;
                file_put_contents($layuiPath.$filename, $response->body());
            }

            $file = run_path('plugin/admin/app/view/layouts/main-layui-vue-index.html');
            $content = file_get_contents($file);
            $updatedContent = preg_replace($pattern,"layui-vue@" . $version, $content);
            file_put_contents($file, $updatedContent);
            return  success('成功升级到'.$version);
        }
    }

}