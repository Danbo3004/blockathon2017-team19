import Web3 from 'web3';

export default class Web3Service {
    constructor(appConfig) {
        this.appConfig = appConfig;
        this.web3 = null;
    }

    getInstance() {
        console.log(web3);
        if ( ! this.web3) {
            const ethNodeConfig = this.appConfig.ETH_NODE;
            //this.web3 = new Web3(new Web3.providers.HttpProvider(`http://${ethNodeConfig.host}:${ethNodeConfig.port}`));
            this.web3 = new Web3(web3.currentProvider);
        }
        return this.web3;
    }
}

Web3Service.$inject = ['appConfig'];