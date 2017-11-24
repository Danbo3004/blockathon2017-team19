export default class HomeController {
    constructor($http) {
        console.log($http);
        console.log('From Home Controller');
    }
}

HomeController.$inject = ['$http'];