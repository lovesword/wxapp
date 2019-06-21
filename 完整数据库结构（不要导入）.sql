

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ims_sqtg_sun_acode
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_acode`;
CREATE TABLE `ims_sqtg_sun_acode` (
  `id` int(11) NOT NULL,
  `code` text COMMENT '随机码',
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='软件授权码';

-- ----------------------------
-- Table structure for ims_sqtg_sun_ad
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_ad`;
CREATE TABLE `ims_sqtg_sun_ad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `url` varchar(200) DEFAULT NULL COMMENT '链接',
  `pic` varchar(200) DEFAULT NULL COMMENT '图片',
  `index` int(4) NOT NULL DEFAULT '1' COMMENT '排序',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `type` int(4) DEFAULT NULL COMMENT '广告类型：1、首页轮播图，2、首页中部广告',
  `memo` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(4) NOT NULL DEFAULT '0' COMMENT '启用状态 1启用',
  `store_id` int(11) DEFAULT '0' COMMENT '商家id',
  `link_type` int(1) DEFAULT '1' COMMENT '1.内链 2.外部小程序 3.客服消息',
  `appid` varchar(100) DEFAULT NULL COMMENT '外部小程序APPID',
  `path` varchar(200) DEFAULT NULL COMMENT '外部小程序链接地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='广告';

-- ----------------------------
-- Table structure for ims_sqtg_sun_admin
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_admin`;
CREATE TABLE `ims_sqtg_sun_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'iq',
  `uniacid` int(11) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL COMMENT '头像',
  `name` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `create_time` int(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(20) DEFAULT NULL COMMENT '修改时间',
  `login_time` int(20) DEFAULT NULL,
  `store_id` int(11) DEFAULT '0' COMMENT '门店id',
  `code` varchar(100) DEFAULT NULL COMMENT '账号',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `state` int(4) DEFAULT '0' COMMENT '状态：1启用 0禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COMMENT='后台管理员账号';

-- ----------------------------
-- Table structure for ims_sqtg_sun_announcement
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_announcement`;
CREATE TABLE `ims_sqtg_sun_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '启用状态1启用',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='公告管理';

-- ----------------------------
-- Table structure for ims_sqtg_sun_baowen
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_baowen`;
CREATE TABLE `ims_sqtg_sun_baowen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xml` text,
  `out_trade_no` varchar(60) DEFAULT NULL,
  `transaction_id` varchar(60) DEFAULT NULL,
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `out_trade_no` (`out_trade_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=636 DEFAULT CHARSET=utf8 COMMENT='支付报文';

-- ----------------------------
-- Table structure for ims_sqtg_sun_cart
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_cart`;
CREATE TABLE `ims_sqtg_sun_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `goods_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品id',
  `num` int(11) NOT NULL DEFAULT '1' COMMENT '商品数量',
  `attr_ids` varchar(250) NOT NULL DEFAULT '0' COMMENT '规格ids',
  `create_time` int(11) DEFAULT '0',
  `leader_id` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT '0',
  `attr_names` varchar(250) NOT NULL DEFAULT '' COMMENT '规格ids',
  `store_id` int(11) NOT NULL DEFAULT '0' COMMENT '商家id',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1104 DEFAULT CHARSET=utf8 COMMENT='购物车';

-- ----------------------------
-- Table structure for ims_sqtg_sun_category
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_category`;
CREATE TABLE `ims_sqtg_sun_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL COMMENT '名称',
  `state` int(4) NOT NULL DEFAULT '1' COMMENT '1启用状态',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 COMMENT='类别管理';

-- ----------------------------
-- Table structure for ims_sqtg_sun_config
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_config`;
CREATE TABLE `ims_sqtg_sun_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `key` varchar(50) DEFAULT NULL COMMENT '关键字',
  `value` text COMMENT '值',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COMMENT='配置信息';

-- ----------------------------
-- Table structure for ims_sqtg_sun_coupon
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_coupon`;
CREATE TABLE `ims_sqtg_sun_coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '优惠券名称',
  `begin_time` int(11) DEFAULT NULL COMMENT '活动开始时间',
  `end_time` int(11) DEFAULT NULL COMMENT '活动结束时间',
  `use_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '单笔满多少金额',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '满减金额',
  `days` int(11) NOT NULL DEFAULT '1' COMMENT '领取后有效天数',
  `num` int(11) NOT NULL DEFAULT '1' COMMENT '总量',
  `left_num` int(11) NOT NULL DEFAULT '0' COMMENT '剩余数量',
  `create_time` int(11) DEFAULT NULL,
  `state` int(4) NOT NULL DEFAULT '1' COMMENT '状态 1开启 2关闭',
  `info` text COMMENT '使用说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='优惠券';

-- ----------------------------
-- Table structure for ims_sqtg_sun_customize
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_customize`;
CREATE TABLE `ims_sqtg_sun_customize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `type` tinyint(4) DEFAULT NULL COMMENT '1 首页banner 2菜单图标 3底部图标',
  `title` varchar(255) DEFAULT NULL COMMENT '标题名称',
  `pic` varchar(200) DEFAULT NULL COMMENT '图标图片',
  `clickago_icon` varchar(200) DEFAULT NULL COMMENT '点击前图标',
  `clickafter_icon` varchar(200) DEFAULT NULL COMMENT '点击后图标',
  `link_type` tinyint(1) DEFAULT '1' COMMENT '1.内链 2.外部小程序 3.客服消息',
  `url_type` tinyint(4) DEFAULT NULL COMMENT '链接类型 1基本 2商品分类',
  `url` varchar(200) DEFAULT NULL COMMENT '链接地址',
  `url_typeid` int(11) DEFAULT '0' COMMENT '链接带参数',
  `url_name` varchar(50) DEFAULT NULL COMMENT '链接名称',
  `appid` varchar(100) DEFAULT NULL COMMENT '外部小程序APPID',
  `path` varchar(200) DEFAULT NULL COMMENT '外部小程序链接地址',
  `sort` int(5) NOT NULL DEFAULT '0' COMMENT '排序 越大越前',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '启用状态 1启用',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=341 DEFAULT CHARSET=utf8 COMMENT='自定义信息包含菜单底部菜单轮播图也适用';

-- ----------------------------
-- Table structure for ims_sqtg_sun_deliveryorder
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_deliveryorder`;
CREATE TABLE `ims_sqtg_sun_deliveryorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `order_no` varchar(60) DEFAULT NULL COMMENT '订单号',
  `create_time` int(11) DEFAULT NULL,
  `confirm_time` int(11) DEFAULT NULL COMMENT '确认收货时间完成时间',
  `state` int(4) NOT NULL DEFAULT '3' COMMENT '1待支付 2待配送 3待收货 4待自提 5已完成 6已取消',
  `store_id` int(11) NOT NULL DEFAULT '0',
  `detail` text,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='配送单';

-- ----------------------------
-- Table structure for ims_sqtg_sun_deliveryordergoods
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_deliveryordergoods`;
CREATE TABLE `ims_sqtg_sun_deliveryordergoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `goods_id` int(11) DEFAULT NULL COMMENT '商品id',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '数量',
  `attr_ids` varchar(250) DEFAULT NULL COMMENT '商品规格',
  `attr_names` varchar(250) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `state` int(4) DEFAULT '3' COMMENT '1待支付 2待配送 3待收货 4待自提 5已完成 6已取消',
  `leader_id` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `receive_num` int(11) DEFAULT '0' COMMENT '团长收货数量',
  `update_time` int(11) DEFAULT NULL,
  `batch_no` varchar(100) DEFAULT '' COMMENT '批次',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='配送单商品列表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_dingtalk
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_dingtalk`;
CREATE TABLE `ims_sqtg_sun_dingtalk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `token` varchar(100) DEFAULT NULL,
  `is_open` tinyint(4) NOT NULL DEFAULT '0',
  `content` varchar(255) DEFAULT NULL COMMENT '下订单提醒',
  `contentrefund` varchar(255) DEFAULT NULL COMMENT '退款申请提醒',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_formid
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_formid`;
CREATE TABLE `ims_sqtg_sun_formid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `form_id` varchar(50) DEFAULT NULL,
  `time` int(20) DEFAULT NULL,
  `uniacid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7119 DEFAULT CHARSET=utf8 COMMENT='表单id';

-- ----------------------------
-- Table structure for ims_sqtg_sun_goods
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_goods`;
CREATE TABLE `ims_sqtg_sun_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` varchar(50) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `cat_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品分类id',
  `name` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `unit` varchar(10) NOT NULL DEFAULT '个' COMMENT '单位',
  `weight` double(10,2) NOT NULL DEFAULT '0.00' COMMENT '重量',
  `index` int(11) NOT NULL DEFAULT '0' COMMENT '排序 从大到小',
  `pic` varchar(200) DEFAULT NULL COMMENT '商品缩略图(封面图)',
  `pics` text COMMENT '商品轮播图',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品销售价',
  `cost_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品成本价',
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品原价展示使用',
  `details` text NOT NULL COMMENT '商品详细',
  `service` varchar(200) DEFAULT NULL COMMENT '服务内容(正品保障)',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '库存',
  `sales_num` int(11) NOT NULL DEFAULT '0' COMMENT '销量 销量支付完成',
  `virtual_num` int(11) NOT NULL DEFAULT '0' COMMENT '虚拟销量',
  `use_attr` int(4) NOT NULL DEFAULT '0' COMMENT '1使用规格',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) NOT NULL COMMENT '修改时间',
  `state` int(4) NOT NULL DEFAULT '1' COMMENT '1启用状态',
  `is_hot` int(4) NOT NULL DEFAULT '0' COMMENT '是否推荐',
  `check_state` int(4) NOT NULL DEFAULT '1' COMMENT '1未审核 2审核成功 3审核失败',
  `fail_reason` varchar(255) DEFAULT NULL,
  `begin_time` int(11) DEFAULT NULL,
  `end_time` int(11) DEFAULT NULL,
  `check_time` int(11) DEFAULT NULL COMMENT '审核时间',
  `leader_draw_type` int(4) DEFAULT '0',
  `leader_draw_rate` decimal(10,2) DEFAULT NULL,
  `leader_draw_money` decimal(10,2) DEFAULT NULL,
  `batch_no` varchar(100) DEFAULT '' COMMENT '批次',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8 COMMENT='商品表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_goodsattr
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_goodsattr`;
CREATE TABLE `ims_sqtg_sun_goodsattr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '规格名称',
  `goods_id` int(11) DEFAULT NULL,
  `goodsattrgroup_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8 COMMENT='商品规格表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_goodsattrgroup
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_goodsattrgroup`;
CREATE TABLE `ims_sqtg_sun_goodsattrgroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '规格分组名称',
  `goods_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8 COMMENT='商品规格分组表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_goodsattrsetting
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_goodsattrsetting`;
CREATE TABLE `ims_sqtg_sun_goodsattrsetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` varchar(50) DEFAULT NULL,
  `key` varchar(250) DEFAULT NULL COMMENT '规格名称列表',
  `attr_ids` varchar(250) NOT NULL DEFAULT '' COMMENT '规格ids',
  `goods_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT '0' COMMENT '库存',
  `price` decimal(10,2) DEFAULT '0.00' COMMENT '单价',
  `weight` double(10,2) DEFAULT '0.00' COMMENT '重量',
  `code` varchar(50) DEFAULT '' COMMENT '编码',
  `pic` varchar(255) DEFAULT '' COMMENT '封面图',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8 COMMENT='商品规格设置表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_leader
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_leader`;
CREATE TABLE `ims_sqtg_sun_leader` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `tel` varchar(60) DEFAULT '' COMMENT '电话',
  `community` varchar(100) DEFAULT NULL COMMENT '小区名称',
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  `longitude` varchar(20) DEFAULT NULL COMMENT '经度',
  `latitude` varchar(20) DEFAULT NULL COMMENT '纬度',
  `user_id` int(11) DEFAULT '0' COMMENT '申请人id',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `check_state` int(4) NOT NULL DEFAULT '1' COMMENT '1未审核 2审核成功 3审核失败',
  `check_time` int(11) DEFAULT NULL,
  `fail_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8 COMMENT='社区团长';

-- ----------------------------
-- Table structure for ims_sqtg_sun_leaderbill
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_leaderbill`;
CREATE TABLE `ims_sqtg_sun_leaderbill` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'iq',
  `content` varchar(100) DEFAULT NULL COMMENT '说明',
  `create_time` varchar(50) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `money` decimal(15,2) DEFAULT NULL,
  `uniacid` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='社区团长账单（分佣）';

-- ----------------------------
-- Table structure for ims_sqtg_sun_leadergoods
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_leadergoods`;
CREATE TABLE `ims_sqtg_sun_leadergoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'iq',
  `create_time` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `uniacid` int(11) DEFAULT NULL,
  `goods_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8 COMMENT='社区团长商品表';

-- ----------------------------
-- Table structure for ims_sqtg_sun_leaderuser
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_leaderuser`;
CREATE TABLE `ims_sqtg_sun_leaderuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'iq',
  `create_time` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `uniacid` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COMMENT='社区团长核销员';

-- ----------------------------
-- Table structure for ims_sqtg_sun_leaderwithdraw
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_leaderwithdraw`;
CREATE TABLE `ims_sqtg_sun_leaderwithdraw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提现全额',
  `wd_type` tinyint(4) DEFAULT NULL COMMENT '提现方式 1微信',
  `wd_account` varchar(100) DEFAULT NULL COMMENT '提现账号',
  `wd_name` varchar(255) DEFAULT NULL COMMENT '提现姓名',
  `wd_phone` varchar(255) DEFAULT NULL COMMENT '提现手机号',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '提现状态 1成功 2失败',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '实际提现金额',
  `paycommission` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '平台佣金',
  `ratesmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '手续费',
  `leader_id` int(11) NOT NULL DEFAULT '0' COMMENT '团长id',
  `baowen` text COMMENT '提现报文',
  `create_time` int(11) DEFAULT NULL COMMENT '申请时间',
  `check_state` int(4) NOT NULL DEFAULT '1' COMMENT '1待审核 2审核通过 3审核失败',
  `err_code` varchar(50) DEFAULT NULL COMMENT '提现错误码',
  `fail_reason` varchar(200) DEFAULT NULL COMMENT '失败原因',
  `tx_time` int(11) DEFAULT NULL COMMENT '提现时间',
  `check_time` int(11) DEFAULT NULL COMMENT '审核时间',
  `no` varchar(50) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_menu
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_menu`;
CREATE TABLE `ims_sqtg_sun_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `create_time` int(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(20) DEFAULT NULL COMMENT '修改时间',
  `memo` varchar(200) DEFAULT NULL COMMENT '备注',
  `index` int(10) DEFAULT NULL COMMENT '排序',
  `menugroup_id` int(11) DEFAULT NULL COMMENT '分组id',
  `control` varchar(50) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `menu_id` int(11) DEFAULT '0',
  `state` tinyint(1) DEFAULT '1' COMMENT '1.启用 0.禁用',
  `store_show` int(4) DEFAULT '1' COMMENT '商户后台是否显示',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=759 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_menugroup
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_menugroup`;
CREATE TABLE `ims_sqtg_sun_menugroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '菜单分组名称',
  `create_time` int(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(20) DEFAULT NULL COMMENT '修改时间',
  `memo` varchar(200) DEFAULT NULL COMMENT '备注',
  `index` int(10) DEFAULT NULL COMMENT '排序',
  `state` tinyint(1) DEFAULT '1' COMMENT '1.启用 0.禁用',
  `store_show` int(4) DEFAULT '1' COMMENT '商户后台是否显示',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=667 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_mercapdetails
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_mercapdetails`;
CREATE TABLE `ims_sqtg_sun_mercapdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL COMMENT '商家id',
  `store_name` varchar(100) DEFAULT NULL COMMENT '商家名称',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '方式 1普通订单 2拼团 3秒杀',
  `mcd_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '提现方式 1订单收入 2微信提现 3审核失败退款',
  `openid` varchar(30) DEFAULT NULL COMMENT '订单收入支付的openid|提现给的openid',
  `sign` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1增加 2减少',
  `mcd_memo` text COMMENT '相关详细信息',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '全额 订单收入全额 提现全额',
  `realmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '实际提现金额',
  `paycommission` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提现支付给平台佣金',
  `ratesmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提现手续费',
  `order_id` int(11) DEFAULT NULL COMMENT '订单收入id',
  `wd_id` int(11) DEFAULT NULL COMMENT '提现id',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1成功 2失败 提现可能会失败',
  `add_time` int(11) DEFAULT NULL,
  `del_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除状态',
  `now_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '当前余额',
  `user_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='商家资金明细';

-- ----------------------------
-- Table structure for ims_sqtg_sun_order
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_order`;
CREATE TABLE `ims_sqtg_sun_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `order_no` varchar(60) DEFAULT NULL COMMENT '订单号',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总金额',
  `coupon_money` decimal(15,2) DEFAULT NULL COMMENT '优惠券金额',
  `usercoupon_id` int(11) NOT NULL DEFAULT '0' COMMENT '使用优惠券id',
  `pay_state` int(4) NOT NULL DEFAULT '0' COMMENT '支付状态 1已支付 ',
  `pay_amount` decimal(15,2) DEFAULT NULL COMMENT '支付总金额',
  `pay_time` int(11) DEFAULT NULL COMMENT '支付时间',
  `create_time` int(11) DEFAULT NULL,
  `confirm_time` int(11) DEFAULT NULL COMMENT '确认收货时间完成时间',
  `cancel_time` int(11) DEFAULT NULL COMMENT '订单取消时间',
  `state` int(4) NOT NULL DEFAULT '1' COMMENT '1待支付 2待配送 3待自提 4已完成 5已取消',
  `is_delete` int(4) NOT NULL DEFAULT '0' COMMENT '1 删除',
  `update_time` int(11) DEFAULT NULL,
  `share_amount` decimal(15,2) DEFAULT '0.00' COMMENT '分润：团长提成，分销提成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=907 DEFAULT CHARSET=utf8 COMMENT='订单信息';

-- ----------------------------
-- Table structure for ims_sqtg_sun_ordergoods
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_ordergoods`;
CREATE TABLE `ims_sqtg_sun_ordergoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) NOT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `goods_id` int(11) DEFAULT NULL COMMENT '商品id',
  `goods_name` varchar(60) DEFAULT NULL COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '单价',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '数量',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总价',
  `attr_ids` varchar(250) DEFAULT NULL COMMENT '商品规格',
  `attr_names` varchar(250) DEFAULT NULL,
  `pic` varchar(100) DEFAULT NULL COMMENT '图片',
  `create_time` int(11) DEFAULT NULL,
  `state` int(4) DEFAULT '1' COMMENT '1待支付 2待配送 3',
  `leader_id` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `coupon_money` decimal(15,2) DEFAULT NULL COMMENT '优惠券金额',
  `pay_amount` decimal(15,2) DEFAULT NULL COMMENT '支付总金额',
  `is_delete` int(4) NOT NULL DEFAULT '0' COMMENT '1 删除',
  `share_amount` decimal(15,2) DEFAULT '0.00' COMMENT '分润：团长提成，分销提成',
  `batch_no` varchar(100) DEFAULT '' COMMENT '批次',
  `distribution_money` decimal(15,2) DEFAULT '0.00' COMMENT '分佣总金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1051 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_payrecord
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_payrecord`;
CREATE TABLE `ims_sqtg_sun_payrecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `source_type` varchar(50) DEFAULT NULL COMMENT '支付类型：orderonline',
  `source_id` int(11) DEFAULT NULL,
  `pay_money` decimal(15,2) DEFAULT NULL,
  `pay_time` int(11) DEFAULT NULL,
  `callback_xml` text,
  `callback_time` int(11) DEFAULT NULL,
  `no` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `memo` varchar(100) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `openid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_pluginkey
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_pluginkey`;
CREATE TABLE `ims_sqtg_sun_pluginkey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plugin_id` int(11) DEFAULT NULL,
  `key` varchar(60) DEFAULT NULL,
  `domain` varchar(100) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '插件名',
  `value` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='插件key';

-- ----------------------------
-- Table structure for ims_sqtg_sun_printing
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_printing`;
CREATE TABLE `ims_sqtg_sun_printing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1飞蛾打印',
  `sn` varchar(20) DEFAULT NULL,
  `key` varchar(60) DEFAULT NULL,
  `user` varchar(60) DEFAULT NULL,
  `is_open` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1开启 2关闭',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='打印配置飞蛾';

-- ----------------------------
-- Table structure for ims_sqtg_sun_prints
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_prints`;
CREATE TABLE `ims_sqtg_sun_prints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(60) DEFAULT NULL COMMENT '打印机名称',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '打印机类型 1飞蛾',
  `user` varchar(60) DEFAULT NULL COMMENT '飞蛾 账号',
  `ukey` varchar(60) DEFAULT NULL COMMENT '飞蛾key',
  `sn` varchar(60) DEFAULT NULL COMMENT '打印机编号',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='打印机';

-- ----------------------------
-- Table structure for ims_sqtg_sun_printset
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_printset`;
CREATE TABLE `ims_sqtg_sun_printset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `prints_id` int(11) NOT NULL DEFAULT '0' COMMENT '打印机id',
  `print_type` varchar(60) NOT NULL DEFAULT '1' COMMENT '打印方式 1下单打印 2付款打印 3确认收货打印 1,2,3',
  `print_merch` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1多商户打印',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_sms
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_sms`;
CREATE TABLE `ims_sqtg_sun_sms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appkey` varchar(100) NOT NULL,
  `tpl_id` int(11) NOT NULL,
  `uniacid` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_open` int(11) NOT NULL DEFAULT '2',
  `tid1` varchar(50) NOT NULL,
  `tid2` varchar(50) NOT NULL,
  `tid3` varchar(50) NOT NULL,
  `order_tplid` int(11) NOT NULL COMMENT '聚合-订单提醒id',
  `order_refund_tplid` int(11) NOT NULL COMMENT '聚合-订单退款提醒id',
  `smstype` tinyint(2) NOT NULL DEFAULT '1' COMMENT '短信类型，1为253，2为聚合',
  `ytx_apiaccount` varchar(50) NOT NULL COMMENT '253短信账号',
  `ytx_apipass` varchar(50) NOT NULL COMMENT '253短信密码',
  `ytx_apiurl` varchar(50) NOT NULL COMMENT '253短信地址',
  `ytx_order` varchar(255) NOT NULL COMMENT '云通信订单消息提醒',
  `ytx_orderrefund` varchar(255) NOT NULL COMMENT '云通信退款订单消息提醒',
  `tid4` varchar(50) DEFAULT NULL COMMENT '开奖模板',
  `aly_accesskeyid` varchar(255) NOT NULL COMMENT '阿里大鱼 accessKeyId',
  `aly_accesskeysecret` varchar(255) NOT NULL COMMENT '阿里大鱼 AccessKeySecret',
  `aly_order` varchar(255) NOT NULL COMMENT '阿里大鱼 订单模板',
  `aly_orderrefund` varchar(255) NOT NULL COMMENT '阿里大鱼 退款模板',
  `aly_sign` varchar(100) NOT NULL COMMENT '签名',
  `xiaoshentui` varchar(255) NOT NULL COMMENT '小神推',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_store
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_store`;
CREATE TABLE `ims_sqtg_sun_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `tel` varchar(60) DEFAULT '' COMMENT '商家电话',
  `address` varchar(200) DEFAULT NULL COMMENT '商家地址',
  `check_state` int(4) NOT NULL DEFAULT '1' COMMENT '1未审核 2审核成功 3审核失败',
  `check_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL COMMENT '经度',
  `latitude` varchar(20) DEFAULT NULL COMMENT '纬度',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商家余额',
  `user_id` int(11) DEFAULT '0' COMMENT '申请人id',
  `fail_reason` varchar(255) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `leader_draw_type` int(4) DEFAULT '0',
  `leader_draw_rate` decimal(10,2) DEFAULT NULL,
  `leader_draw_money` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COMMENT='商家(门店)';

-- ----------------------------
-- Table structure for ims_sqtg_sun_storeleader
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_storeleader`;
CREATE TABLE `ims_sqtg_sun_storeleader` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `leader_id` int(11) DEFAULT '0',
  `store_id` int(11) DEFAULT '0',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COMMENT='商家团长（配送）';

-- ----------------------------
-- Table structure for ims_sqtg_sun_storeuser
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_storeuser`;
CREATE TABLE `ims_sqtg_sun_storeuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(4) NOT NULL DEFAULT '0' COMMENT '启用状态 1启用',
  `store_id` int(11) DEFAULT '0' COMMENT '商家id',
  `user_id` int(11) DEFAULT '0' COMMENT '商家id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商户用户';

-- ----------------------------
-- Table structure for ims_sqtg_sun_suspension
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_suspension`;
CREATE TABLE `ims_sqtg_sun_suspension` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT '1' COMMENT '是否开启 1开启 0关闭',
  `show_index` tinyint(1) DEFAULT '1' COMMENT '1.只在首页显示 0.全部显示',
  `tel_icon` varchar(200) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `tel_open` tinyint(1) DEFAULT '1' COMMENT '1.一键拨号开启 0.关闭',
  `customer_service_open` tinyint(1) DEFAULT '1' COMMENT '1.客服图标开启 0.关闭',
  `customer_service_icon` varchar(200) DEFAULT NULL,
  `wxapp_open` tinyint(1) DEFAULT '1' COMMENT '1.开启外链 0.关闭',
  `wxapp_icon` varchar(200) DEFAULT NULL,
  `wxapp_appid` varchar(100) DEFAULT NULL,
  `wxapp_path` varchar(200) DEFAULT NULL COMMENT '外部小程序页面地址',
  `show_style` tinyint(1) DEFAULT '1' COMMENT '1.点击收起 0.显示全部',
  `back_icon` varchar(200) DEFAULT NULL COMMENT '回到首页图标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='悬浮图标';

-- ----------------------------
-- Table structure for ims_sqtg_sun_system
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_system`;
CREATE TABLE `ims_sqtg_sun_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `appid` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT 'appid',
  `appsecret` varchar(200) CHARACTER SET latin1 DEFAULT NULL COMMENT 'appsecret',
  `mchid` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '商户号',
  `wxkey` varchar(250) CHARACTER SET latin1 DEFAULT NULL COMMENT '商户秘钥',
  `uniacid` int(11) DEFAULT NULL,
  `create_time` int(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(20) DEFAULT NULL COMMENT '修改时间',
  `apiclient_cert` text COMMENT '支付密钥退款发红包提现使用',
  `apiclient_key` text COMMENT '支付密钥退款发红包提现使用',
  `pt_name` varchar(30) DEFAULT NULL COMMENT '平台名称',
  `index_title` varchar(60) DEFAULT NULL COMMENT '首页自定义标题',
  `ht_title` varchar(60) DEFAULT NULL COMMENT '后台顶部自定义标题',
  `tel` varchar(20) DEFAULT NULL COMMENT '客服联系电话',
  `fontcolor` varchar(20) DEFAULT '#000000' COMMENT '平台顶部文字颜色(只有黑白)',
  `top_color` varchar(20) DEFAULT NULL COMMENT '平台顶部风格颜色',
  `bottom_color` varchar(20) DEFAULT NULL COMMENT '平台底部风格颜色',
  `jszc_show` int(4) NOT NULL DEFAULT '0' COMMENT '技术支持开关 1开 2关',
  `jszc_tel` varchar(20) DEFAULT NULL COMMENT '技术支持-电话',
  `jszc_img` varchar(200) DEFAULT NULL COMMENT '技术支持-头像',
  `jszc_name` varchar(50) DEFAULT NULL COMMENT '技术支持-团队名称',
  `receipt_num` int(11) NOT NULL DEFAULT '10' COMMENT '收货时间(从发货到自动确认收货的时间)',
  `after_sale_num` int(11) NOT NULL DEFAULT '7' COMMENT '售后时间',
  `send_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '发货方式 1快递或自提 2仅快递 3仅自提',
  `integral_status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '积分开启状态 1开启',
  `integral_rate1` int(11) NOT NULL DEFAULT '1' COMMENT '积分比例商家比例 ',
  `integral_rate2` int(11) NOT NULL DEFAULT '1' COMMENT '积分比例赠送积分比例 当integral_rate1为1 integral_rate2为2时消费1元获得2积分',
  `is_open_member` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否开启会员功能 1开启',
  `member_info` text COMMENT '会员须知',
  `bottom_fontcolor_a` varchar(20) DEFAULT NULL COMMENT '底部导航文字选中前颜色',
  `bottom_fontcolor_b` varchar(20) DEFAULT NULL COMMENT '底部导航文字选中后颜色',
  `menu_fontcolor_a` varchar(20) DEFAULT NULL COMMENT '菜单图标文字选中前颜色',
  `menu_fontcolor_b` varchar(20) DEFAULT NULL COMMENT '菜单图标文字选中后颜色',
  `personcenter_color_b` varchar(20) DEFAULT NULL COMMENT '个人中心顶部背景',
  `showorderset` text COMMENT '展示订单设置',
  `showgw` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否显示福利群',
  `wg_title` varchar(100) DEFAULT NULL COMMENT '福利群名称',
  `wg_img` varchar(255) DEFAULT NULL COMMENT '福利群logo',
  `wg_keyword` varchar(255) DEFAULT NULL COMMENT '福利群加群关键字',
  `wg_directions` varchar(255) DEFAULT NULL COMMENT '福利群说明',
  `wg_addicon` varchar(255) DEFAULT NULL COMMENT '加群图标',
  `pt_pic` varchar(100) DEFAULT NULL COMMENT '平台名称',
  `bottom_cart_color_a` varchar(20) DEFAULT NULL COMMENT '底部导航购物车提示前景色',
  `bottom_cart_color_b` varchar(20) DEFAULT NULL COMMENT '底部导航购物车提示背景色',
  `map_key` varchar(100) DEFAULT NULL COMMENT '腾讯地图key',
  `goods_pic_b` varchar(100) DEFAULT NULL COMMENT '商品海报背景图',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_task
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_task`;
CREATE TABLE `ims_sqtg_sun_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL COMMENT '标题',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(4) NOT NULL DEFAULT '0' COMMENT '启用状态 1启用',
  `level` int(11) DEFAULT '1',
  `value` varchar(255) DEFAULT NULL,
  `execute_time` int(11) DEFAULT NULL COMMENT '预计执行时间',
  `execute_times` int(11) DEFAULT '0' COMMENT '尝试执行次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COMMENT='广告';

-- ----------------------------
-- Table structure for ims_sqtg_sun_template
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_template`;
CREATE TABLE `ims_sqtg_sun_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `tid1` varchar(50) DEFAULT NULL COMMENT '支付通知',
  `tid2` varchar(50) DEFAULT NULL COMMENT '订单取消',
  `tid3` varchar(50) DEFAULT NULL COMMENT '发货通知',
  `tid4` varchar(50) DEFAULT NULL COMMENT '退款通知',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='模板消息';

-- ----------------------------
-- Table structure for ims_sqtg_sun_templatecontent
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_templatecontent`;
CREATE TABLE `ims_sqtg_sun_templatecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL COMMENT '任务id',
  `touser` varchar(30) DEFAULT NULL COMMENT '接受者',
  `template_id` varchar(60) DEFAULT NULL COMMENT '模板id',
  `page` varchar(200) DEFAULT NULL COMMENT '跳转页面',
  `form_id` varchar(60) DEFAULT NULL,
  `data` text,
  `create_time` int(11) DEFAULT NULL,
  `result` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模板内容信息';

-- ----------------------------
-- Table structure for ims_sqtg_sun_user
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_user`;
CREATE TABLE `ims_sqtg_sun_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'iq',
  `openid` varchar(100) DEFAULT NULL COMMENT 'openid',
  `img` varchar(200) DEFAULT NULL COMMENT '头像',
  `uniacid` int(11) DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  `name` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '昵称',
  `birthday` varchar(40) DEFAULT NULL COMMENT '生日',
  `gender` int(1) DEFAULT '0' COMMENT '性别',
  `email` varchar(40) DEFAULT NULL COMMENT '邮箱',
  `create_time` int(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(20) DEFAULT NULL COMMENT '修改时间',
  `login_time` int(20) DEFAULT NULL,
  `share_user_id` int(11) DEFAULT '0' COMMENT '分享人id',
  `last_share_user_id` int(11) DEFAULT '0' COMMENT '最后分享人',
  `first_share_user_id` int(11) DEFAULT '0' COMMENT '最早推荐人id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1455 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_usercode
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_usercode`;
CREATE TABLE `ims_sqtg_sun_usercode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL COMMENT '随机码',
  `end_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=551 DEFAULT CHARSET=utf8 COMMENT='用户随机码';

-- ----------------------------
-- Table structure for ims_sqtg_sun_usercoupon
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_usercoupon`;
CREATE TABLE `ims_sqtg_sun_usercoupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) NOT NULL DEFAULT '0' COMMENT '优惠券id',
  `create_time` int(11) DEFAULT NULL COMMENT '领取时间',
  `end_time` int(11) DEFAULT NULL COMMENT '过期时间',
  `state` int(4) NOT NULL DEFAULT '0' COMMENT '1未使用，2已使用',
  `use_time` int(11) DEFAULT NULL COMMENT '使用时间',
  `name` varchar(100) DEFAULT NULL COMMENT '优惠券名称',
  `info` text COMMENT '使用说明',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '满减金额',
  `use_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '单笔满多少金额',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1453 DEFAULT CHARSET=utf8 COMMENT='用户优惠券';

-- ----------------------------
-- Table structure for ims_sqtg_sun_withdraw
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_withdraw`;
CREATE TABLE `ims_sqtg_sun_withdraw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL COMMENT '提现openid',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提现全额',
  `wd_type` tinyint(4) DEFAULT NULL COMMENT '提现方式 1微信',
  `wd_account` varchar(100) DEFAULT NULL COMMENT '提现账号',
  `wd_name` varchar(255) DEFAULT NULL COMMENT '提现姓名',
  `wd_phone` varchar(255) DEFAULT NULL COMMENT '提现手机号',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '提现状态 1成功 2失败',
  `realmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '实际提现金额',
  `paycommission` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '平台佣金',
  `ratesmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '手续费',
  `store_id` int(11) NOT NULL DEFAULT '0' COMMENT '商家id',
  `store_name` varchar(100) DEFAULT NULL COMMENT '商家名称',
  `baowen` text COMMENT '提现报文',
  `add_time` int(11) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1审核通过 2审核失败',
  `is_state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0不需要审核 1需要审核',
  `err_code` varchar(50) DEFAULT NULL COMMENT '提现错误码',
  `err_code_des` varchar(200) DEFAULT NULL COMMENT '失败原因',
  `tx_time` int(11) DEFAULT NULL COMMENT '提现时间',
  `request_time` int(11) DEFAULT NULL,
  `del_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除状态',
  `review_time` int(11) DEFAULT NULL COMMENT '审核时间',
  `return_status` tinyint(4) NOT NULL DEFAULT '0',
  `return_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ims_sqtg_sun_withdrawbaowen
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_withdrawbaowen`;
CREATE TABLE `ims_sqtg_sun_withdrawbaowen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `openid` varchar(30) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '提现金额',
  `baowen` text,
  `wd_id` int(11) DEFAULT NULL COMMENT '提现id',
  `add_time` int(11) DEFAULT NULL,
  `request_data` text COMMENT '请求数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='提现报文';

-- ----------------------------
-- Table structure for ims_sqtg_sun_withdrawset
-- ----------------------------
DROP TABLE IF EXISTS `ims_sqtg_sun_withdrawset`;
CREATE TABLE `ims_sqtg_sun_withdrawset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uniacid` int(11) DEFAULT NULL,
  `wd_type` varchar(255) NOT NULL DEFAULT '1' COMMENT '提现方式 1微信提现',
  `min_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '最低提现金额',
  `avoidmoney` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '免审金额',
  `is_open` tinyint(4) NOT NULL DEFAULT '1' COMMENT '提现开关 1开 2关',
  `cms_rates` float NOT NULL DEFAULT '0' COMMENT '平台抽成比率',
  `wd_wxrates` float NOT NULL DEFAULT '0' COMMENT '微信提现手续费费率',
  `wd_content` text COMMENT '提现须知',
  `add_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='提现设置';
