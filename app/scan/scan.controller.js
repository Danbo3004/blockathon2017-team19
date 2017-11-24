import Instascan from 'instascan';

export default class ScanController {
    constructor(messageDecoder, $scope) {
        this.messageDecoder = messageDecoder;
        this.tryQrcodeFailed = false;
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

    processMessage(message) {
        console.log('message', message);
        const decodedMessage = this.messageDecoder.decode(message);
        if (!decodedMessage) {
            this.tryQrcodeFailed = true;
        }
    }
}

ScanController.$inject = ['messageDecoder', '$scope'];