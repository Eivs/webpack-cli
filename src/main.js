import _ from  './js/underscore'
import './assets/css/style.css'
import img from './assets/img/what-is-webpack.png'

console.log(_);

let pic = document.createElement('img');
pic.src = img;

document.body.appendChild(pic)
