export default ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '',
            controller: 'home.controller as $ctrl',
            templateUrl: 'app/home/home.html',
            resolve: {}
        })
        .state('scan', {
            url: '/scan',
            controller: 'scan.controller as $ctrl',
            templateUrl: 'app/scan/scan.html',
            resolve: {}
        })
}