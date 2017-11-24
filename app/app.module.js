import angular from 'angular';
import uiBoostrap from 'angular-ui-bootstrap';

import HomeController from './home/home.controller';
import IndexController from './index.controller';

import appComponent from './components';
    
let app = angular.module('AppModule', ['ui.bootstrap', 'app.components']);

app.controller('index.controller', IndexController);

app.controller('home.controller', HomeController);  
