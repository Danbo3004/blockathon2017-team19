export default ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '',
            controller: 'home.controller as $ctrl',
            templateUrl: 'app/home/home.html'
        })
        .state('scan', {
            url: '/scan',
            controller: 'scan.controller as $ctrl',
            templateUrl: 'app/scan/scan.html'
        })
        .state('send-point', {
            url: '/send-point/:address?amount',
            controller: 'send-point.controller as $ctrl',
            templateUrl: 'app/send-point/send-point.html'
        });
}