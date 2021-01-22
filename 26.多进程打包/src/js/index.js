import { mul } from './test';
import '../style/a.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
// eslint-disable-next-line
console.log(mul(2, 3));

/*
  1.eslint不认识window,navigator全局变量
  解决: 需要修改package.json中的eslintConfig配置
  "env":{
    "browser": true // 支持浏览器端全局变量
  }
  2.serviceworker代码必须运行在服务器上
    --> nodejs
    -->
      npm i serve -g
      serve -s build 启动服务器,将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功');
      })
      .catch(() => {
        console.log('sw注册失败');
      });
  });
}
