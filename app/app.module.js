import style from './style.css';

import angular from 'angular';
import uiBoostrap from 'angular-ui-bootstrap';
import angularUiRoute from 'angular-ui-router';
import angularCookies from 'angular-cookies';

import HomeController from './home/home.controller';
import IndexController from './index.controller';
import ScanController  from './scan/scan.controller';
import SendPointController from './send-point/send-point.controller';
import LoginController from './login/login.controller';

import qrCodeDirective from './directives/qrcode.directive';
import isEthAddressDirective from './directives/is-eth-address.directive';

import QrcodeGenerator from './services/qrcode-generator.service';
import EthAddressValidation from './services/eth-address-validation.service';
import DecodeMessage from './services/decode-message.service';
import Web3Service from './services/web3.service';
import YoloUserService from './services/yolo-user.service';


import appComponent from './components';
import routerConfig from './router.config';
import appConfig from './app.config';
    
let app = angular.module('AppModule', ['ui.bootstrap', 'app.components', 'ui.router', 'ngCookies']);

app.constant('appConfig', appConfig);
app.config(routerConfig);

app.controller('index.controller', IndexController);
app.controller('home.controller', HomeController);  
app.controller('scan.controller', ScanController);
app.controller('send-point.controller', SendPointController);
app.controller('login.controller', LoginController);


app.directive('qrCode', qrCodeDirective);
app.directive('isEthAddress', isEthAddressDirective);

app.service('qrcodeGenerator', QrcodeGenerator);
app.service('ethAddressValidation', EthAddressValidation);
app.service('messageDecoder', DecodeMessage);
app.service('web3', Web3Service);
app.service('yoloUser', YoloUserService);
