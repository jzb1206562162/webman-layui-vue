<?php

namespace plugin\admin\app\model;

use plugin\admin\app\model\Base;

/**
 * @property integer $id ID(����)
 * @property string $username �û���
 * @property string $nickname �ǳ�
 * @property string $password ����
 * @property string $avatar ͷ��
 * @property string $email ����
 * @property string $mobile �ֻ�
 * @property string $created_at ����ʱ��
 * @property string $updated_at ����ʱ��
 * @property string $login_at ��¼ʱ��
 * @property string $roles ��ɫ
 * @property integer $status ״̬ 0���� 1����
 */
class Admin extends Base
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'wa_admins';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';




}