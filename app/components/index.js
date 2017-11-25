import angular from 'angular';

import HeaderComponent from './template/header';

const appComponents = angular.module('app.components', []);

appComponents
    .component('header', HeaderComponent)


export default appComponents;