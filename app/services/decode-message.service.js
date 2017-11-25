export default class DecodeMessageService {
    constructor(ethAddressValidation) {
        this.ethAddressValidation = ethAddressValidation;
        this.acceptTypes = ['INFO', 'INVOICE', 'VOUCHER']
     };

    /**
     * A valid message have format TYPE|Address|Data
     */
    decode(message) {
        if (!message) return null;

        let fragments = message.split('|');
        if (fragments.length != 3) return null;

        const type = fragments[0];
        if (this.acceptTypes.indexOf(type) < 0) return null;

        const address = fragments[1];
        if ( ! this.ethAddressValidation.isAddress(address) && ! this.ethAddressValidation.isChecksumAddress(address)) return null;

        const data = fragments[2];
        if (type === 'INVOICE' || type === 'VOUCHER') {
            if (isNaN(data) || parseFloat(data) <= 0) return null;
        }

        return {
            type: type,
            address: address,
            data: data
        }
    }
};

DecodeMessageService.$inject = ['ethAddressValidation'];