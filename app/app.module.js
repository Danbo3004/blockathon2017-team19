import angular from 'angular';
import uiBoostrap from 'angular-ui-bootstrap';
import angularUiRoute from 'angular-ui-router';

import HomeController from './home/home.controller';
import IndexController from './index.controller';

import qrCodeDirective from './directives/qrcode.directive';

import QrcodeGenerator from './services/qrcode-generator.service';

import appComponent from './components';
import routerConfig from './router.config';
    
let app = angular.module('AppModule', ['ui.bootstrap', 'app.components', 'ui.router']);

app.config(routerConfig);

app.controller('index.controller', IndexController);

app.controller('home.controller', HomeController);  

app.directive('qrCode', qrCodeDirective);

app.service('qrcodeGenerator', QrcodeGenerator);
