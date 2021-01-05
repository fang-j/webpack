/*
  服务器代码
  启动服务器命令
  第一种方式
  安装  npm i nodemon -g
  启动 nodemon server.js
  第二种
  node server.js
*/

const express = require('express');
const app = express();
app.use(express.static('built', {maxAge: 1000 * 3600 }));
app.listen(3001);