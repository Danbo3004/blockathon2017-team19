import qrCode from 'qrcode';

export default class HomeController {
    constructor(qrcodeGenerator, yoloUser, $scope) {
        this.qrcodeGenerator = qrcodeGenerator;
        this.yoloUser = yoloUser;
        this.loadWallet();
        this.loadLastTransactions();
        this.$scope = $scope;
    }

    loadWallet() {
        let self = this;
        self.yoloUser.getWallet().then((wallet)=> {
            self.$scope.$apply(()=> {
                self.wallet = wallet;
                self.qrcodeContent = self.qrcodeGenerator.info(self.wallet.address, self.wallet.name);
            });
        });
    }

    loadLastTransactions() {
        this.lastTransactions = [
            {
                status: 'sent',
                address: '0xc56844fa6d515f2e800dd74832a8aca9a1fd7d53',
                amount: 1.2,
                createdAt: new Date()
            },
            {
                status: 'received',
                address: '0xc56844fa6d515f2e800dd74832a8aca9a1fd7d53',
                amount: 1.2,
                createdAt: new Date()
            },
            {
                status: 'pending',
                address: '0xc56844fa6d515f2e800dd74832a8aca9a1fd7d53',
                amount: 1.2,
                createdAt: new Date()
            }
        ];
    }

    

    generateQrCode() {
        console.log('abc');
        qrCode.toCanvas(document.getElementById('canvas'),`INFO|${this.wallet.address}|${this.wallet.name}`, function (error) {
            if (error) console.error(error)
            console.log('success!');
          })
    }
}

HomeController.$inject = ['qrcodeGenerator', 'yoloUser', '$scope'];