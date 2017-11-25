import metaCoinAbi from '../../build/contracts/MetaCoin.json';
import { default as contract } from 'truffle-contract'

export default class YoloUserService {
    constructor(web3, $cookies, appConfig) {
        this.$cookies = $cookies;
        this.web3 = web3.getInstance();
        this.currentUser = this.$cookies.get('currentUser') || appConfig.default_user;
        console.log(this.currentUser);

        this.metaCoinContract = contract(metaCoinAbi);
        this.metaCoinContract.setProvider(this.web3.currentProvider);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getWallet() {
        return this.getBalance().then((balance)=> {
            return {
                address: this.currentUser.address,
                balance: balance,
                name: this.currentUser.name
            }
        });
    }

    login({address, name}) {
        this.currentUser = {
            address: address,
            name: name
        }
        this.$cookies.put('currentUser', this.currentUser);
    }

    logout() {
        this.currentUser = null;
        this.$cookies.remove('currentUser');
    }

    send({address, amount}) {

    }

    getBalance() {
        let account = this.currentUser.address;
        return new Promise((resolve, reject) => {
            this.metaCoinContract.deployed().then(function(instance) {
                return instance.balanceOf.call(account, {from: account});
              }).then(function(value) {
                return resolve(value.toNumber());
              }).catch(function(e) {
                return reject(e);
              });
        });
    }
}

YoloUserService.$inject = ['web3', '$cookies', 'appConfig'];