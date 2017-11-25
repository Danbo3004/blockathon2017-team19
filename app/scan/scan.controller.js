import Instascan from 'instascan';
import { isNumber } from 'util';

export default class ScanController {
    constructor(messageDecoder, $scope, $state) {
        this.messageDecoder = messageDecoder;
        this.$state = $state;
        this.tryQrcodeFailed = false;
        this.decodedMessage = null;
        this.getCameras();

        this.$scope = $scope;
        $scope.$on('$destroy', () => {
            console.log('Destroy Scan');
            this.stopCamera();
        });
    }

    getCameras() {
        let self = this;
        self.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        self.scanner.addListener('scan', function (content) {
            self.stopCamera();
            self.processMessage(content); 
        });

        Instascan.Camera.getCameras().then(function (cameras) {
            console.log('camera', cameras);
            if (cameras.length > 0) {
                self.currentCamera = cameras[0];
                self.scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    stopCamera() {
        this.currentCamera && this.scanner.stop(this.currentCamera);
    }

    tryAgain() {
        this.tryQrcodeFailed = false;
        this.getCameras();
    }

    processMessage(message) {
        console.log('message', message);
        const decodedMessage = this.messageDecoder.decode(message);
        if (!decodedMessage) {
            this.$scope.$apply(() => {
                this.tryQrcodeFailed = true;
            })

        } else {
            this.$scope.$apply(() => {
                this.decodedMessage = decodedMessage;
            })

        }
    }

    send() {
        this.$state.go('send-point', {
            address: this.decodedMessage.address, 
            amount: this.decodedMessage.data
        });
    }
}

ScanController.$inject = ['messageDecoder', '$scope', '$state'];