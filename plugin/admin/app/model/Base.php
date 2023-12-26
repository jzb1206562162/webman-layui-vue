<?php

namespace plugin\admin\app\model;

use DateTimeInterface;
use support\Model;

//重新生成文件方法
//php webman ide-helper:models "plugin\admin\app\model\Admin" ,
//先得删除全部注释才行;
//或者说它不会修改已存在的内容,只会添加不存在的内容
//比如id存在,备注ID,数据库备注更改了,重新生成这里备注不会改,只有将里的ID字段删除,才会重新根据数据库生成新的字段和备注
//数据库删除了一个字段,这里也不会更新的!!!!!
//当有些备注添加了自定义内容后,可以保留此字段,删除其他字段;再更新

//只需要在app/model下生成的话  php webman make:model test这种更方便好

class Base extends Model
{
    /**
     * @var string
     */
    protected $connection = 'plugin.admin.mysql';

    /**
     * 格式化日期
     *
     * @param DateTimeInterface $date
     * @return string
     */
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}