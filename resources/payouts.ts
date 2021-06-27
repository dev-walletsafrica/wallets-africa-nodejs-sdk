import axios from 'axios';

/**
 * @class Payouts
 * All Payout functionality and methods based on api
 * {@link https://https://documenter.getpostman.com/view/10058163/SWLk4RPL?version=latest#90e5b45a-9ae1-4eaa-85ae-9aa569835bdb View Api Docs}
 */
class Payouts {
    /*
        Api keys
     */
    static secretKey = '';

    static endpoint = 'transfer/bank';

    /*
        Get transaction details about wallet to bank transfer
     */

    static async bankTransferDetails(transRef: string) {
        const body = {TransactionReference: transRef, SecretKey: this.secretKey};
        const url = `${this.endpoint}/details`;

        return axios.post(url, body);
    }

    /*
        Transfer from wallet to bank account supplied
      */
    static async bankAccountTransfer(options: BankTransOptions) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/account`;

        return axios.post(url, body);
    }

    /*
        Returns account details for the specified account number
    */
    static async accountEnquiry(options: {accountNumber: string; bankCode: string}) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/account/enquire`;

        return axios.post(url, body);
    }

    /*
        Returns list of Banks and their codes
    */
    static async getBanks() {
        const body = '';
        const url = `${this.endpoint}s/all`;

        return axios.post(url, body);
    }
}

export default Payouts;
