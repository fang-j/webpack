import '../style/a.css';
import '../style/b.less';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完毕!');
    resolve();
  }, 1000);
});

console.log(promise);
