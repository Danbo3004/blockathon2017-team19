export default ($routeProvider, $locationProvider) => {
    $routeProvider
    
    .otherwise({
        controller: 'home.controller',
        templateUrl: 'app/home/home.html'
    });
}