export default class SendPoint {
    constructor(ethAddressValidation) {
        this.ethAddressValidation = ethAddressValidation;

        this.payload = {
            address: '',
            amount: ''
        };
        console.log('from send point controller');
    }

    isValidAddress (address) {
        console.log(this.ethAddressValidation.isAddress(address));
        return this.ethAddressValidation.isAddress(address);
    }

    submit() {
        if (this.submitting) return;
        this.submitting = true;
        console.log('valid payload', this.payload);
    }

    openCamera() {
        
    }

}

SendPoint.$inject = ['ethAddressValidation'];