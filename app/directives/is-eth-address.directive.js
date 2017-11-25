class IsEthAddress {
    constructor(ethAddressValidator) {
        this.ethAddressValidator = ethAddressValidator;
        this.restrict = 'A';
        this.require = 'ngModel';
    }

    link(scope, element, attr, ctrl) {
        ctrl.$validators.ethAddress = (modelValue, viewValue) => {
            return this.ethAddressValidator.isAddress(modelValue);
        }
    }
}
IsEthAddress.$inject = ['ethAddressValidation'];
export default IsEthAddress;

