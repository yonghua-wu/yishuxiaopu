# 易书小铺WEB端调试流程

## 环境准备

- Node.js
- Git

## 下载项目

> 已下两种方法任选其一。需要先创建空的目录，进入后再执行命令

### 1、直接克隆项目

- `git clone git@github.com:woxiangchixingxing/yishuxiaopu.git`

### 2、关联远程仓库

首先需要在本地初始化 `git`

- `git init`

然后关联远程仓库

- `git remote add origin git@github.com:woxiangchixingxing/yishuxiaopu.git`

最后将远程仓库合并到本地

- `git pull origin master`

下次远程仓库有更新时

- `git reset --hard` 退回上一个版本， 再执行 `git pull origin master`

## 项目初始化

下载依赖

- `npm install` 或 `cnpm install` (淘宝源)

修改接口地址

- 打开 `/src/utils/config.js` 文件，将 `HOST` 修改为自己的接口地址

## 启动项目

进入项目根目录，运行命令 `npm run serve` 。当出现 `http://localhost:8080/` 字样项目就启动成功了，这时在浏览器中输入[http://localhost:8080/](http://localhost:8080/)就可以看到页面。在浏览器中按 `F12` ，在出现的调试面板中点击的手机样式的图标，即可模拟项目在手机中的样子。
