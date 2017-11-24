export default ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '',
            controller: 'home.controller as $ctrl',
            templateUrl: 'app/home/home.html'
        })
}