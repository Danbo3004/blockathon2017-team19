class HeaderController {
    constructor(yoloUser, $scope, $state) {
        this.isNavCollapsed = true;
        this.yoloUser = yoloUser;
        this.$scope = $scope;
        this.$state = $state;

        this.loadBalance();
    }

    loadBalance() {
        let self = this;
        this.yoloUser.getBalance().then((balance) => {
            self.$scope.$apply(() => {
                self.balance = balance;
            })
        });
    }

    logout() {
        this.yoloUser.logout();
        this.$state.go('login');
    }
}

HeaderController.$inject = ['yoloUser', '$scope', '$state'];

export default HeaderController;