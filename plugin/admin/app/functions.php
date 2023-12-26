<?php
/**
 * Here is your custom functions.
 */

use plugin\admin\app\model\User;
use plugin\admin\app\model\Admin;
use plugin\admin\app\model\AdminRole;
use support\Response;

/**
 * Here is your custom functions.
 */
function post(string $key, $def = ''){
    $request=request();
    $value = $request->post($key);
    if (is_string($value)) $value = trim($value);
    return strlen($value) ==0?$def:$value ;
}
function get(string $key, $def = '')
{
    $request = request();
    $value = $request->get($key);
    if (is_string($value)) $value = trim($value);
    return strlen($value) ==0 ?$def:$value;
}
function isPost(): bool
{
    $request = request();
    return $request->method()=='POST';// && $request->isAjax();
}

function isGet(): bool
{
    $request = request();
    return $request->method()=='GET' ;
}
/**
 * 返回格式化json数据
 *
 * @param int|array $code array时直接输出
 * @param string $msg
 * @param array $data
 * @param bool $bool true时直接返回原始数据
 * @return array|Response
 */
function json_return( $code, string $msg = '', array $data = [])
{
    if ($code == 0 && empty($msg)) {
        $msg = '操作成功';
    } elseif ($code == 1 && empty($msg)) {
        $msg = '操作失败';
    } elseif (!is_int($code)) {
        return json($code);
    }
    $res = ['code' => $code, 'msg' => $msg, 'data' => $data];
    return json($res);
}

function success(string $msg = '操作成功', array $data = []): Response
{
    return json_return(0, $msg, $data);
}

function error(string $msg = '操作失败', array $data = []): Response
{
    return json_return(1, $msg, $data);
}

/**
 * 当前管理员id
 * @return integer|null
 */
function admin_id(): ?int
{
    return session('admin.id');
}

/**
 * 当前管理员
 * @param null|array|string $fields
 * @return array|mixed|null
 */
function admin($fields = null)
{
    refresh_admin_session();
    if (!$admin = session('admin')) {
        return null;
    }
    if ($fields === null) {
        return $admin;
    }
    if (is_array($fields)) {
        $results = [];
        foreach ($fields as $field) {
            $results[$field] = $admin[$field] ?? null;
        }
        return $results;
    }
    return $admin[$fields] ?? null;
}

/**
 * 当前登录用户id
 * @return integer|null
 */
function user_id(): ?int
{
    return session('user.id');
}

/**
 * 当前登录用户
 * @param null|array|string $fields
 * @return array|mixed|null
 */
function user($fields = null)
{
    refresh_user_session();
    if (!$user = session('user')) {
        return null;
    }
    if ($fields === null) {
        return $user;
    }
    if (is_array($fields)) {
        $results = [];
        foreach ($fields as $field) {
            $results[$field] = $user[$field] ?? null;
        }
        return $results;
    }
    return $user[$fields] ?? null;
}

/**
 * 刷新当前管理员session
 * @param bool $force
 * @return void
 */
function refresh_admin_session(bool $force = false)
{
    $admin_session = session('admin');
    if (!$admin_session) {
        return null;
    }
    $admin_id = $admin_session['id'];
    $time_now = time();
    // session在2秒内不刷新
    $session_ttl = 2;
    $session_last_update_time = session('admin.session_last_update_time', 0);
    if (!$force && $time_now - $session_last_update_time < $session_ttl) {
        return null;
    }
    $session = request()->session();
    $admin = Admin::find($admin_id);
    if (!$admin) {
        $session->forget('admin');
        return null;
    }
    $admin = $admin->toArray();
    $admin['password'] = md5($admin['password']);
    $admin_session['password'] = $admin_session['password'] ?? '';
    if ($admin['password'] != $admin_session['password']) {
        $session->forget('admin');
        return null;
    }
    // 账户被禁用
    if ($admin['status'] != 0) {
        $session->forget('admin');
        return;
    }
    $admin['roles'] = AdminRole::where('admin_id', $admin_id)->pluck('role_id')->toArray();
    $admin['session_last_update_time'] = $time_now;
    $session->set('admin', $admin);
}


/**
 * 刷新当前用户session
 * @param bool $force
 * @return void
 */
function refresh_user_session(bool $force = false)
{
    if (!$user_id = user_id()) {
        return null;
    }
    $time_now = time();
    // session在2秒内不刷新
    $session_ttl = 2;
    $session_last_update_time = session('user.session_last_update_time', 0);
    if (!$force && $time_now - $session_last_update_time < $session_ttl) {
        return null;
    }
    $session = request()->session();
    $user = User::find($user_id);
    if (!$user) {
        $session->forget('user');
        return null;
    }
    $user = $user->toArray();
    unset($user['password']);
    $user['session_last_update_time'] = $time_now;
    $session->set('user', $user);
}