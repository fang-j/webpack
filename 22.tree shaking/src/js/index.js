import { mul } from './test';
import '../style/a.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
// eslint-disable-next-line
console.log(mul(2, 3));