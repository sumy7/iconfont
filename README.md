# iconfont 图标字体生成

使用gulp将svg文件夹中的文件生成为iconfont字体文件，并生成提供demo文件预览。提供server.sh文件可以启用一个简单的http服务器用于对文件进行预览。

## svg命名

`三位编号-图标名称.svg` 编号不足三位以0补全，比如001。

## 打包方式

执行命令
```
cnpm install
cnpm run iconfont
```

生成的文件在 `dist` 文件夹。

## 使用

需要的文件是 `style.css` 和 `fonts/`，其余的文件都是demo使用的文件。

## 启动HTTP服务

进入dist文件夹，执行 `sh server.sh start` 即可在本地 `4020` 端口启用一个服务进行预览。

## FAQ

1. svg文件夹里的图标可以删除吗？

svg文件夹里的图标来自[https://icomoon.io/app/](https://icomoon.io/app/)的示例图标，目的就是为了替换成为自己的（难看的）图标。

2. 如何修改字体名称和class前缀？

这类配置在gulp的配置文件 `gulpfile.js` 中定义，需要修改这个文件中定义的内容。

3. 为什么会有一个HTTP服务器？

这个HTTP服务器使用的是Python2的SimpleHTTPServer实现的，不是所有的服务器都有node但是所有的服务器都有Python（？）。一个简单的HTTP就可以解决Jenkins最后一个命令的问题。

4. 这个项目有什么意义？

参考（抄）了好多的代码，Thanks♪(･ω･)ﾉ。本身想作为使用git管理图标的一种尝试，配合Jenkins实现自动化打包预览。感觉上就非常赞。。。

5. Jenkins部(￣ε(#￣)☆╰╮(￣▽￣///)。。。

雨女无瓜。。。

5. 那么是谁询问的这些问题？

当然是我自己了。。。
