export default class QrcodeGenerator {
    constructor() {
        
    }

    info(address, name) {
        return `INFO|${address}|${name}`;
    }
    
    invoice(address, amount) {
        return `INVOICE|${address}|${amount}`;
    }

    voucher(address, amount) {
        return `VOUCHER|${address}|${amount}`;
    }

    
}