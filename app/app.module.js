import angular from 'angular';
import uiBoostrap from 'angular-ui-bootstrap';
import angularRoute from 'angular-route';

import HomeController from './home/home.controller';
import IndexController from './index.controller';

import appComponent from './components';
import routerConfig from './router.config';
    
let app = angular.module('AppModule', ['ui.bootstrap', 'app.components', 'ngRoute']);

app.config(routerConfig);

app.controller('index.controller', IndexController);

app.controller('home.controller', HomeController);  
