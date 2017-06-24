# GREWords #

此项目定时同步微博[GRE机器人](http://weibo.com/p/1005051734409641)拉取单词，每日生成清单，供自己学习英语背单词所使用(已剔除掉中文释义)

使用`express`搭建的简易服务器，`cheerio`解析DOM，再存入到mongodb之中，代码部署于heroku


## usage ##

每天最新结果见 [https://derycktse-gre.herokuapp.com](https://derycktse-gre.herokuapp.com)

查看往期结果：
`https://derycktse-gre.herokuapp.com/{日期}`

如：
`https://derycktse-gre.herokuapp.com/20170613`