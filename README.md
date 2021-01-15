### 如何编译不同环境的小程序包

- 添加自定义环境域名配置JSON文件

| 文件               | 说明           |
| ------------------ | -------------- |
| config.xytest.json | xytest 环境    |
| config.test.json   | 甲方 测试环境  |
| config.star.json   | 星云 star 环境 |
| ....               | 更多自定义环境 |

- package.json 中添加自定义条件编译配置

```JSON
"uni-app": {
		"scripts": {
			"xytest": {
				"title": "星云TEST", // 在HBuilderX中会显示在 运行/发行 菜单中
				"env": {
					"UNI_PLATFORM": "mp-weixin" // 编译基准平台，详见uni-app官网
				},
				"define": {
					"XYTEST": true // 自定义条件编译常量
				}
			},
			"first-party-test": {
				"title": "TEST",
				"env": {
					"UNI_PLATFORM": "mp-weixin"
				},
				"define": {
					"FIRST-PARTY-TEST": true
				}
			}
		}
	}
```

- main.js 使用条件编译导入添加的自定义环境域名JSON文件

```JS
// #ifdef XYTEST
const {
	domain,
	imgDomain,
	businessDomain
} = require('./config.xytest.json')
// #endif
```

- api/http.js 添加

```JS
// #ifdef XYTEST
	let h = require('../config.xytest.json')
// #endif
```

- HBuilderX 会根据 package.json 的扩展配置，在 运行 / 发行 菜单下生成自定义菜单，点击相应菜单进行编译即可，如图所示：

![Snipaste_2020-09-30_15-27-27](C:\Users\EDZ\Desktop\Snipaste_2020-09-30_15-27-27.png)

![Snipaste_2020-09-30_15-27-42](C:\Users\EDZ\Desktop\Snipaste_2020-09-30_15-27-42.png)