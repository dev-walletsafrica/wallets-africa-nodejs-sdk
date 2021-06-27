import axios from 'axios';

/**
 *  All wallet functionality and methods
 * @class wallet
 */
class Wallet {
    /*
        Api key
     */
    static secretKey = '';

    static endpoint = '/wallet';

    /**
     * Performs a debit on a sub wallet
     */
    static async debit(options: {
        transactionReference: string;
        amount: number;
        phoneNumber: string;
    }) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/debit`;

        return axios.post(url, body);
    }

    /**
     * Performs a credit on a sub wallet
     */
    static async credit(options: {
        transactionReference: string;
        amount: number;
        phoneNumber: string;
    }) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/credit`;

        return axios.post(url, body);
    }

    /**
     * Generate
     */
    static async generate(options: CreateOptions & {currency?: string}) {
        if (!('currency' in options)) {
            options.currency = 'NGN';
        }
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/generate`;

        return axios.post(url, body);
    }

    /**
     * Retrieves account number tied to a wallet
     */
    static async retrieveAccountNumber(phone: string) {
        const body = {phoneNumber: phone, SecretKey: this.secretKey};
        const url = `${this.endpoint}/nuban`;

        return axios.post(url, body);
    }

    /**
     * Sets password for a subwallet
     */
    static async setPassword(options: {phoneNumber: string; password: string}) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/password`;

        return axios.post(url, body);
    }

    /**
     * Sets pin for a subwallet
     */
    static async setPin(options: {phoneNumber: string; transactionPin: string}) {
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/pin`;

        return axios.post(url, body);
    }

    /**
     * Returns transaction
     */
    static async transactions(options: TransactionOptions & {transactionPin: string}) {
        options.currency = options.currency ? options.currency : 'NGN';
        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/transactions`;

        return axios.post(url, body);
    }

    /**
     * Gets a user by phone number
     */
    static async getUserByPhone(phone: string) {
        const body = {phoneNumber: phone, SecretKey: this.secretKey};
        const url = `${this.endpoint}/getuser`;

        return axios.post(url, body);
    }

    /**
     * Gets a user by email
     */
    static async getUserByEmail(email: string) {
        const body = {email: email, SecretKey: this.secretKey};
        const url = `${this.endpoint}/getuser`;

        return axios.post(url, body);
    }

    /**
     * Returns wallet balance
     */
    static async getBalance(options: {phoneNumber: string; currency?: currencyType}) {
        if (!('currency' in options)) {
            options.currency = 'NGN';
        }

        const body = {...options, SecretKey: this.secretKey};
        const url = `${this.endpoint}/balance`;

        return axios.post(url, body);
    }
}

export default Wallet;
