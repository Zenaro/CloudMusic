-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-05-27 03:59:29
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- 表的结构 `app_info`
--

CREATE TABLE `app_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `uid` int(10) NOT NULL,
  `name` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(34) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_info`
--

INSERT INTO `app_info` (`id`, `uid`, `name`, `image`) VALUES
(1, 2, 'Zenaro', '../../../src/home/image/face.png'),
(14, 27, 'ASD', '../../../src/home/image/profile.jp');

-- --------------------------------------------------------

--
-- 表的结构 `app_music`
--

CREATE TABLE `app_music` (
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `src` text COLLATE utf8_unicode_ci NOT NULL,
  `master` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lyric` text COLLATE utf8_unicode_ci NOT NULL,
  `id` int(10) UNSIGNED NOT NULL,
  `listeners` int(10) UNSIGNED NOT NULL,
  `type` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_music`
--

INSERT INTO `app_music` (`name`, `src`, `master`, `lyric`, `id`, `listeners`, `type`) VALUES
('V.A.-キミを思うメロディー', 'http://7xstax.com1.z0.glb.clouddn.com/VA-missing.mp3', 'V.A.', '纯音乐无歌词', 2, 2500, 'up'),
('you -- Graveyard-you', 'http://7xstax.com1.z0.glb.clouddn.com/M.Graveyard-you.mp3', '《寒蝉鸣泣之时》原生', '纯音乐无歌词', 4, 3200, 'up'),
('butterfly', 'http://113.207.2.56/m10.music.126.net/20160525140705/851e318330124acd154f082e585493ba/ymusic/d702/cbab/c805/3c85b58e8be1a237c175a40f7c60322e.mp3?wshc_tag=0&wsts_tag=57453b2d&wsid_tag=b7ee4c31&wsiphost=ipdbm', 'Alex G', 'Can you feel it? \r\n你能感觉到吗？\r\nIn the air like you can breathe it? \r\n就像你能呼吸空气\r\nWatch it break through the ceiling \r\n看它穿过天花板\r\nAnd you know it ain''t coming down \r\n你知道它不会掉下来了\r\nAnd I made it, like a song you keep repeating \r\n我做到了，就像一首你重复播放的歌\r\nNow my heart is overheated \r\n现在我的心过热了\r\nAnd I''m tired of it burning down \r\n我对它被烧毁已经疲倦了\r\nTalking back and forth \r\n来回地交谈\r\n"Hopping" back and forth baby \r\n上下跳跃 宝贝\r\nTrying to let it go \r\n试着随它吧\r\nTrying to make it look easy \r\n试着让它看起来容易些\r\nNow I can''t hold back \r\n现在我不能犹豫不决\r\nThe butterflies \r\n蝴蝶啊\r\nYou brought them back to life \r\n你把它们带回生活中\r\nNow I''m alive inside \r\n现在我活着\r\nYou brought them back to life \r\n你把它们带回生活中\r\nTonight the world is on our side \r\n今夜这个世界在我们这边\r\nI feel the spark ignite \r\n我感觉到火光燃烧\r\nYou brought me back to life \r\n你把我带回生活中\r\nBack to life \r\n带回生活中\r\nI was waiting \r\n我在等待\r\nOn the edge of something wicked \r\n在邪恶的事物边缘\r\nNever thought I''d find a reason \r\n从没想过我会找到一个理由\r\nTo lower my guard and try \r\n去降低我的警惕并尝试\r\nNow I see it \r\n现在我看到了\r\nIn your eyes, something deeper \r\n在你的眼睛里 更深的地方\r\nAnd you wore me like a fever \r\n你让我发了烧\r\nAnd I''m ready to walk the line \r\n我准备好走这条路了\r\nTalking back and forth \r\n来回地交谈\r\n"Hopping" back and forth baby \r\n上下跳跃 宝贝\r\nTrying to let it go \r\n试着随它吧\r\nTrying to make it look easy \r\n试着让它看起来容易些\r\nNow I can''t hold back \r\n现在我不能犹豫不决\r\nThe butterflies \r\n蝴蝶啊\r\nYou brought them back to life \r\n你把它们带回生活中\r\nNow I''m alive inside \r\n现在我活着\r\nYou brought them back to life \r\n你把它们带回生活中\r\nTonight the world is on our side \r\n今夜这个世界在我们这边\r\nI feel the spark ignite \r\n我感觉到火光燃烧\r\nYou brought me back to life \r\n你把我带回生活中\r\nBack to life \r\n带回生活中\r\nI think I''m falling for you now \r\n我想我听信了你的话\r\nBut I''m afraid to let it out \r\n我害怕顺其自然\r\nI used to hold it in but you''re so worth the risk yeah \r\n我习惯握住它但是你值得我冒险\r\nTalking back and forth \r\n来回地交谈\r\n"Hopping" back and forth baby \r\n上下跳跃 宝贝\r\nTrying to let it go \r\n试着随它吧\r\nTrying to make it look easy \r\n试着让它看起来容易些\r\nNow I can''t hold back \r\n现在我不能犹豫不决\r\nThe butterflies \r\n蝴蝶啊\r\nYou brought them back to life \r\n你把它们带回生活中\r\nNow I''m alive inside \r\n现在我活着\r\nYou brought them back to life \r\n你把它们带回生活中\r\nTonight the world is on our side \r\n今夜这个世界在我们这边\r\nI feel the spark ignite \r\n我感觉到火光燃烧\r\nYou brought me back to life \r\n你把我带回生活中\r\nBack to life \r\n带回生活中', 10, 3352, 'up'),
('ばんばんしー-in the autumn sky', 'http://7xstax.com1.z0.glb.clouddn.com/in-the-autumn-sky.mp3', '秋姉妹のなく頃に', '纯音乐无歌词', 11, 2233, 'new'),
('相爱很难', 'http://7xstax.com1.z0.glb.clouddn.com/%E6%9D%8E%E5%85%8B%E5%8B%A4%2C%E5%AE%B9%E7%A5%96%E5%84%BF%20-%20%E7%9B%B8%E7%88%B1%E5%BE%88%E9%9A%BE%20(Live)%20-%20live.mp3', '李克勤--容祖儿', '[ti:相爱很难(张学友梅艳芳)]\r\n[ar:梅艳芳]\r\n[al:]\r\n[00:03.69] 词曲：作曲／编曲：陈辉阳 填词：林夕\r\n[00:19.78] 女：最好 有生一日都爱下去\r\n[00:26.69]  但谁人 能将恋爱当做终生兴趣\r\n[00:33.75] 男：生活 其实旨在找到个伴侣\r\n[00:40.76]  面对现实 热恋很快变长流细水\r\n[00:47.03] 女：可惜我 不智或侥倖\r\n[00:50.50]  对火花天生敏感\r\n[00:54.80] 男：不过 两只手拉得太紧\r\n[00:58.71] 合：爱到过了界那对爱人\r\n[01:01.73]  同时亦最易变成一对敌人\r\n[01:10.79] 女：也许相爱很难\r\n[01:10.50]  就难在其实双方各有各寄望\r\n[01:15.77]  怎么办\r\n[01:15.44] 男：要单恋都难\r\n[01:17.46]  受太大的礼会内疚却也无力归还\r\n[01:23.82] 女：也许不爱不难\r\n[01:25.68]  但如未成佛升仙也会怕\r\n[01:29.51]  爱情前途黯淡\r\n[01:31.96] 男：爱不爱都难\r\n[01:32.81]  未快乐先有责任给予对方面露欢颜\r\n[01:37.48] 女：得到浪漫 又要有空间\r\n[01:41.02] 男：得到定局 却怕去到终站\r\n[01:44.30] 合：然后付出多得到少不介意豁达\r\n[01:48.23]  又担心 有人看不过眼\r\n[02:04.47] 女：可惜我 不智或侥倖\r\n[02:07.22]  对火花天生敏感\r\n[02:11.59] 男：不过 两只手拉得太紧\r\n[02:14.41] 合：爱到过了界那对爱人\r\n[02:17.36]  同时亦最易变成一对敌人\r\n[02:25.95] 女：也许相爱很难\r\n[02:27.69]  就难在其实双方各有各寄望\r\n[02:31.15]  怎么办\r\n[02:32.03] 男：要单恋都难\r\n[02:34.74]  受太大的礼会内疚却也无力归还\r\n[02:39.81] 女：也许不爱不难\r\n[02:41.14]  但如未成佛升仙也会怕\r\n[02:44.29]  爱情前途黯淡\r\n[02:46.90] 男：爱不爱都难\r\n[02:48.93]  未快乐先有责任给予对方面露欢颜\r\n[02:53.14] 女：得到浪漫 又要有空间\r\n[02:56.24] 男：得到定局 却怕去到终站\r\n[03:00.91] 合：然后付出多得到少不介意豁达\r\n[03:04.70]  又担心 有人看不过眼\r\n[03:10.18] 合：无论热恋中失恋中\r\n[03:13.96] 都永远记住第一戒\r\n[03:18.64] 别要张开双眼', 24, 3500, 'new');

-- --------------------------------------------------------

--
-- 表的结构 `app_news`
--

CREATE TABLE `app_news` (
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `type` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `pubDate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_news`
--

INSERT INTO `app_news` (`title`, `content`, `id`, `type`, `pubDate`) VALUES
('迎新年，全民福利活动Let''s Go！', '内容省略五千字…………', 1, '活动', '2016-01-08'),
('银翼邮递员传递祝福！圣诞祝福征集正式开始', '内容省略5000字…………', 2, '活动', '2016-01-07'),
('12·12线上活动，买赠大行动！', '内容省略ccc', 3, '焦点', '2015-11-19'),
('新专辑体验资格已更新，请登录页面查询', '不知道，还没想好', 4, '公告', '2016-01-07'),
('猜歌无级限 活动嗨不停', '呃，待会再说……', 5, '公告', '2016-01-10'),
('节日歌单大折扣', '布吉岛', 6, '焦点', '2016-01-16'),
('音乐概念站·Silver Light From The Above', '就是说啊', 7, '活动', '2016-01-22');

-- --------------------------------------------------------

--
-- 表的结构 `app_umusic`
--

CREATE TABLE `app_umusic` (
  `uid` int(10) UNSIGNED NOT NULL,
  `mid` int(10) UNSIGNED NOT NULL,
  `colDate` date NOT NULL,
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_umusic`
--

INSERT INTO `app_umusic` (`uid`, `mid`, `colDate`, `id`) VALUES
(2, 10, '2016-02-26', 25),
(3, 5, '2016-02-18', 20),
(2, 2, '2016-02-26', 46),
(2, 1, '2016-02-26', 45),
(2, 4, '2016-02-26', 44),
(2, 5, '2016-02-26', 43),
(2, 6, '2016-02-26', 42),
(2, 8, '2016-02-26', 41),
(2, 10, '2016-02-26', 40),
(2, 7, '2016-02-26', 39),
(2, 9, '2016-02-26', 38),
(2, 3, '2016-02-26', 37);

-- --------------------------------------------------------

--
-- 表的结构 `app_user`
--

CREATE TABLE `app_user` (
  `email` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `pwd` char(34) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `regDate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `app_user`
--

INSERT INTO `app_user` (`email`, `pwd`, `id`, `regDate`) VALUES
('572001239@qq.com', 'dcf44e9c52c45576ad75f04c37a52166', 2, '2016-01-24'),
('asd@qq.com', 'dcf44e9c52c45576ad75f04c37a52166', 27, '2016-02-26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_info`
--
ALTER TABLE `app_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_music`
--
ALTER TABLE `app_music`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_news`
--
ALTER TABLE `app_news`
  ADD PRIMARY KEY (`type`,`pubDate`,`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `app_umusic`
--
ALTER TABLE `app_umusic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `app_info`
--
ALTER TABLE `app_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 使用表AUTO_INCREMENT `app_music`
--
ALTER TABLE `app_music`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `app_news`
--
ALTER TABLE `app_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `app_umusic`
--
ALTER TABLE `app_umusic`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- 使用表AUTO_INCREMENT `app_user`
--
ALTER TABLE `app_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
