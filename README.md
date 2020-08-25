# import被webpack编译成了什么？
> 此项目根据文章[你的import被webpack编译成了什么？](https://juejin.im/post/6859569958742196237)创建。

## import的两种使用方法
- import module from './path'
- import('./path')

## 安装依赖
新建项目并安装依赖
```bash
npm i webpack webpack-cli -D
```

## 文件
- src/index.js
  ```javascript
  import { intro } from './intro';

  intro();

  const iButton = () => {
    const button = document.createElement('button');
    const buttonText = document.createTextNode('click me');
    button.appendChild(buttonText);
    button.onclick = () => {
      import('./print')
        .then((print) => print.default());
    }
    return button;
  }

  document.body.appendChild(iButton());
  ```

- src/print.js
  ```javascript
  export default print = () => console.log('I\'m print.js.')
  ```

- src/intro.js
  ```javascript
  export const intro = () => console.log('I\'m zane!');
  ```

- webpack.config.js
  ```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js'
    }
  }
  ```

## 步骤
1. npm run build(`webpack --config webpack.config.js`)，生成两个js：main.js、0.main.js；
  [![build.png](https://gallary.ithen.cn/images/2020/08/25/build.png)](https://gallary.ithen.cn/image/itM)
2. 创建index.html并引入生成的main.js；
  ```html
  <!DOCTYPE HTML>
  <html>
    <body>
      <script type="text/javascript" src="./main.js"></script>
    </body>
  </html>
  ```
3. 打开index.html和调试，点击按钮并查看控制台network发生了什么；

页面打开时：
![print.js.png](https://gallary.ithen.cn/images/2020/08/25/print.js.png)
页面打开时的network：
![not-click.png](https://gallary.ithen.cn/images/2020/08/25/not-click.png)
点击按钮后的network：
![clicked.png](https://gallary.ithen.cn/images/2020/08/25/clicked.png)
4. 查看生成的main.js和0.main.js源代码。

## 结论
1. `import module from './path'`被webpack打包生成以文件名为key值，执行函数为value的Map对象；
2. `import('./path')`为懒加载，会在页面需要的时候动态生成一个script并引入改js。