import metaCoinAbi from '../../build/contracts/YolCoin.json';
import voucherContractAbi from '../../build/contracts/VoucherContract.json';
import { default as contract } from 'truffle-contract'

export default class YoloUserService {
    constructor(web3, $cookies, appConfig) {
        this.$cookies = $cookies;
        this.web3 = web3.getInstance();
        this.currentUser = this.$cookies.get('currentUser') || appConfig.default_user;
        console.log(this.currentUser);

        this.metaCoinContract = contract(metaCoinAbi);
        this.metaCoinContract.setProvider(this.web3.currentProvider);

        this.voucherContract = contract(voucherContractAbi);
        this.voucherContract.setProvider(this.web3.currentProvider);
        this.voucherContract.deployed().then((instance)=> {
            return instance.createVoucher.call(1,1,1, {from: '0xa2fa30b9e8609969b8d3a3e625ef5b88e0c19c3c'})
        }).then((result)=> {
            console.log('voucher', result.toNumber());
        });
        this.voucherContract.deployed().then((instance)=> {
            return instance.myVoucher.call({from: this.currentUser.address})
        }).then((result)=> {
            console.log('voucher', result.toNumber());
        });
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