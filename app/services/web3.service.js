export default class Web3Service {
    constructor(appConfig) {
        this.appConfig = appConfig;
        this.web3 = null;
    }

    getInstance() {
        if ( ! this.web3) {
            const ethNodeConfig = this.appConfig.ETH_NODE;
            this.web3 = new Web3(new Web3.providers.HttpProvider(`http://${ethNodeConfig.host}:${ethNodeConfig.port}`));
        }
        return this.web3;
    }
}

Web3Service.$inject = ['appConfig'];