export default class SendPoint {
    constructor(ethAddressValidation, $stateParams) {
        this.ethAddressValidation = ethAddressValidation;
        console.log($stateParams);
        this.payload = {
            address: $stateParams.address || '',
            amount: parseFloat($stateParams.amount) || ''
        };
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

SendPoint.$inject = ['ethAddressValidation', '$stateParams'];