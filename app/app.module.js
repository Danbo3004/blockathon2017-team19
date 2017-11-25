import style from './style.css';

import angular from 'angular';
import uiBoostrap from 'angular-ui-bootstrap';
import angularUiRoute from 'angular-ui-router';

import HomeController from './home/home.controller';
import IndexController from './index.controller';
import ScanController  from './scan/scan.controller';
import SendPointController from './send-point/send-point.controller';

import qrCodeDirective from './directives/qrcode.directive';
import isEthAddressDirective from './directives/is-eth-address.directive';

import QrcodeGenerator from './services/qrcode-generator.service';
import EthAddressValidation from './services/eth-address-validation.service';
import DecodeMessage from './services/decode-message.service';


import appComponent from './components';
import routerConfig from './router.config';
    
let app = angular.module('AppModule', ['ui.bootstrap', 'app.components', 'ui.router']);

app.config(routerConfig);

app.controller('index.controller', IndexController);
app.controller('home.controller', HomeController);  
app.controller('scan.controller', ScanController);
app.controller('send-point.controller', SendPointController);


app.directive('qrCode', qrCodeDirective);
app.directive('isEthAddress', isEthAddressDirective);

app.service('qrcodeGenerator', QrcodeGenerator);
app.service('ethAddressValidation', EthAddressValidation);
app.service('messageDecoder', DecodeMessage);
