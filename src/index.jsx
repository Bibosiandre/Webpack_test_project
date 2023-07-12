import * as $ from 'jquery'
import Post from '@models/post'
import json from './assets/json.json'
import xml from './assets/data.xml'
import Webpackphoto from '@/assets/1.jpg'
import React from 'react'
import {render} from 'react-dom'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
const post = new Post('Webpack_test', Webpackphoto)
$('pre').addClass('code').html(post.toString())

const App = () => (
    <div class="container">
      <h1>Test project webpack</h1>
      <hr></hr>
      <div class="logo"></div>
      <hr></hr>
      <div class="box">
        <h2>LESS</h2>
      </div>
      <hr></hr>
      <div class="card">
        <h2>SCSS</h2>
      </div>
    </div>
  );
render(<App/>, document.getElementById('app'))