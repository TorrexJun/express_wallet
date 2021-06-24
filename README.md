<br>
# <center>活动生成模板</center>

<br>
@author：Torrex（torrexjun@outlook.com）

@data：2021-04-19

-------
### 前因

- 活动开发周期短，页面搭建时间短
- 各类活动的页面模板框架相较同一
- 进行多入口开发过程中，有时会出现一些配置没有完成情形

-------
### 多入口
多入口是为了解决项目使用单页面负载过重的问题，打包成独立的html,js和css，能公用项目内的公共组件和样式。
实现方法：
1. 新增main.js、新增/public/index.html
2. 在vue.config.js 完成多入口配置
```js
"index": {
  "entry": "src/main.js",
  "template": "public/index.html"
},
```


-------
### 解决目标
- 解决多入口配置并生成入口配置文件(page.index.json)，使得多入口配置目录更加清晰
- 自动完成多入口配置，并生成对应项目的views文件夹及app.vue、main.js、index.html、api.js及index.js的引入、路由重定向的配置
- 使得开发者专注于vue和api的开发

-------
### 技术介绍及实现流程

- inquirer-常见的交互式命令行用户界面的集合
- node的方法 fs、os

1. 通过inquirer键入生成当前活动的名称
2. 通过fs，根据config文件夹内的基础模板文件，写入到src文件夹内
3. 生成对应的html入口和api文件等
4. 开发者只需完成对应的app.vue的页面和api的调用开发即可

-------
### 目录结构简要说明

```js
|- config                     |- 模板配置
   |- add.project.conf.js        |- 执行文件
   |- api                        |- 新增的api文件
   |- App.vue                    |- 新增的vue文件
   |- index.html                 |- 新增的html文件
   |- main.js                    |- 新增的主文件
   |- page.index.json            |- 项目内所有活动的入口配置
|- vue.config.js              |- 引入page.index,json 完成多入口配置
```