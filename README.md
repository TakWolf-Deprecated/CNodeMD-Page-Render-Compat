# CNodeMD客户端页面渲染兼容方案 #

主要为 [CNode-Material-Design](https://github.com/TakWolf/CNode-Material-Design) 在Markdown渲染上提供一种兼容方案

该问题来源于 [issues#26@TakWolf/CNode-Material-Design](https://github.com/TakWolf/CNode-Material-Design/issues/26)

主要思路是，通过一个WebView渲染整个列表页面，以减轻和回避现有列表渲染方案出现的各种问题

需要实现的页面包括：话题详情（TopicCompatActivity.java）和消息（NotificationCompatActivity.java）

UI上需要和原生渲染基本保持一致，包含白天和夜间两种主题

计划兼容到 API 9+ (Android 2.3)

注意，这不是一个纯粹的面向Web的项目，实际使用的时候会涉及和原生代码进行交互，这部分使用桥接来模拟

也就是说，这个项目仅仅实现UI的渲染，网络数据仍然通过原生代码获取

## Credits ##

- [Vue.js](http://cn.vuejs.org)

- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

## Author ##

TakWolf

[takwolf@foxmail.com](mailto:takwolf@foxmail.com)

[http://takwolf.com](http://takwolf.com)

## License ##

    Copyright 2015-2016 TakWolf
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.