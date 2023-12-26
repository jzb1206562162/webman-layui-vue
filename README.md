<div style="padding:18px;max-width: 1024px;margin:0 auto;background-color:#fff;color:#333">
<h1>webman-layui-vue-admin</h1></div>

基于<a href="https://www.workerman.net" target="__blank">workerman</a>开发的后台PHP框架</br>

基于<a href="https://www.workerman.net/doc/webman-admin/" target="__blank">webman/admin</a>官方后台开发的layui-vue后台</br>

基于<a href="http://www.layui-vue.com/zh-CN/index">layui-vue</a>前端UI框架,<b>使用cdn引入方式,非前后端分离,无需node.js;</b></br>

基于<a href="https://gitee.com/layui-vue/layui-vue-admin">layui-vue-admin</a>现成的TypeScript项目全面改编成javascript方式</br>

初衷:官方后台layui.js开发的后台,自觉不方便,便使用vue3+layui-vue重写了后台UI,并略微对webman-admin进行了改造,并将其改为前后端不分离的版本</br>

<b>注意:本项目主体为plugin/admin 文件夹,本质上是沿用官方后台插件并使用think-template改了前端UI;</b></br>

<b>安装方式:</b></br>

<b>1:</b>简单方式,直接克隆到本地并安装composer install ,然后php start.php start运行项目,访问/app/admin,并安装数据库即可</br>

<b>2.自己手动安装</b></br>

先composer安装好workerman和官方webman-admin插件,</br>

composer create-project workerman/webman

composer require -W webman/admin

然后将官方plugin/admin文件夹删除,把我的项目plugin/admin文件复制过去
(这一步是因为安装官方admin时自动装了很多依赖插件,不先安装再删除就需要手动一个个插件安装,麻烦)

再安装两个插件:</br>
composer require topthink/think-template

composer require yzh52521/easyhttp

接着就可以直接php start.php start运行项目,访问/app/admin即可</br>








<div style="padding:18px;max-width: 1024px;margin:0 auto;background-color:#fff;color:#333">
<h1>感谢webman</h1>
<h1>学习</h1>

<ul>

  <li>
    <a href="https://www.ajjl.xin/app/admin" target="__blank">演示</a>
  </li>
  <li>
    <a href="https://www.workerman.net/webman" target="__blank">webman</a>
  </li>
  <li>
    <a href="https://www.workerman.net/doc/webman-admin/" target="__blank">webman-admin</a>
  </li>
  <li>
    <a href="http://www.layui-vue.com/zh-CN/index" target="__blank">layui-vue</a>
  </li>
  <li>
    <a href="https://gitee.com/layui-vue/layui-vue-admin" target="__blank">layui-vue-admin</a>
  </li>
  <li>
    <a href="https://www.kancloud.cn/manual/think-template/1286412" target="__blank">think-template </a>
  </li>
</ul></div>