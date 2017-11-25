export default class LoginController {
    constructor($state, yoloUser, $scope){
        this.$state = $state;
        this.yoloUser = yoloUser;
        this.$scope = $scope;
    }

    continue() {
        this.yoloUser.login({address: this.address, name: this.name});
        this.$state.go('home');
    }
}

LoginController.$inject = ['$state', 'yoloUser', '$scope'];