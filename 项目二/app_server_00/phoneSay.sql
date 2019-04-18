-- 注释：判断是否存在qz，如果有就删除重新创建
SET NAMES UTF8;
DROP DATABASE IF EXISTS qzz;
CREATE DATABASE qzz CHARSET=UTF8;
-- 注释：编码格式utf8
USE qzz;
-- 注释：使用qz库
-- 用户详细信息
CREATE TABLE qz_u_all(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(24),
  -- 用户名
  upwd VARCHAR(32),
  -- 用户密码
  email VARCHAR(64),
  -- 用户注册邮箱
  gender INT,
  -- 用户注册性别
  avatar VARCHAR(100),
  -- 签名
  ctime VARCHAR(100),                
  -- 用户注册时间
  stateU BOOLEAN,
  -- 登录状态
  count int
  -- 被赞
);
-- 插入2条测试数据
INSERT INTO qz_u_all VALUES(null,"qqq",md5("k123"),"2@qq.com",1,"努力总会有回报","111",false,1);
INSERT INTO qz_u_all VALUES(null,"yyy",md5("k123"),"1@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"www",md5("k123"),"3@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"eee",md5("k123"),"14@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"rrr",md5("k123"),"15@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"fff",md5("k123"),"1651@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"ddd",md5("k123"),"1156165@qq.com",0,"努力总会有回报","1111",false,2);
INSERT INTO qz_u_all VALUES(null,"sss",md5("k123"),"156165@qq.com",0,"努力总会有回报","1111",false,2);

-- #用户好友搜索
CREATE TABLE qz_speak(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  id INT,
  uname VARCHAR(32),
  friendid INT,
  frienduname VARCHAR(32) 
);

-- INSERT INTO qz_speak VALUES(null,2,"yyy",1,"qqq");
-- #用户聊天记录
CREATE TABLE qz_speak_s(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  frienduname VARCHAR(32),
  friendid INT,
  uname VARCHAR(32),
  id INT,
  say VARCHAR(100),
  sayTime VARCHAR(24)
);

-- #用户发表朋友圈
CREATE TABLE qz_sayThing (
  sayid INT PRIMARY KEY AUTO_INCREMENT,
  id INT,
  uname VARCHAR(32),
  sayto VARCHAR(260),
  saytoTime VARCHAR(24)
);
-- 用户登录日志
CREATE TABLE qz_day(
  dayid INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(32),
  user_loginTime VARCHAR(24)
);

CREATE TABLE qz_about(
  aId INT PRIMARY key AUTO_INCREMENT,
  header VARCHAR(24),
  body VARCHAR(300),
  foot VARCHAR(120)
);

INSERT INTO qz_about VALUES(null,"关于","努力变强,犹如雄狮苏醒,与先锋者为伍","版本:V 1.0.0.20190413");


