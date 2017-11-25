import qrCode from 'qrcode';

export default class HomeController {
    constructor(qrcodeGenerator) {
        this.qrcodeGenerator = qrcodeGenerator;
        this.loadWallet();
        this.loadLastTransactions();
    }

    loadWallet() {
        this.wallet = {
            address: '0x4ba5db882bdbe90ee1a91790d6d4f24efbaa41ea',
            balance: 120.5,
            name: 'Ta Quang Phong'
        }
        this.qrcodeContent = this.qrcodeGenerator.info(this.wallet.address, this.wallet.name);
        console.log('content', this.qrcodeContent);
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

HomeController.$inject = ['qrcodeGenerator'];