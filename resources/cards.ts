import axios from 'axios';

/**
 * @class Cards
 * All Card functionality and methods based on api
 * {@link https://https://documenter.getpostman.com/view/10058163/SWLk4RPL?version=latest#90e5b45a-9ae1-4eaa-85ae-9aa569835bdb View Api Docs}
 */
class Card {
    /*
        Api keys
     */
    static secretKey = '';

    static endpoint = 'cards';

    /*
        Returns State Id and Local Id for create card request
     */

    static async nigerianStatesAndLgas() {
        const url = `${this.endpoint}/states`;

        return axios.get(url);
    }

    /*
        Returns identity types for the create card request
      */
    static async identityTypes() {
        const url = `${this.endpoint}/Idtypes`;

        return axios.get(url);
    }

    /*
        Returns exchange rates for the current day
    */
    static async exchangeRates() {
        const url = `${this.endpoint}/rates`;

        return axios.get(url);
    }

    /*
        Creates virtual or physical card
     */

    static async createCard(options: CreateCardOptions) {
        const body = {...options, secretKey: this.secretKey};
        const url = `${this.endpoint}/create`;

        return axios.post(url, body);
    }

    /*
        Funds your card
     */

    static async fundCard(cardId: string, amount: number) {
        const body = {cardId: cardId, Amount: amount, secretKey: this.secretKey};
        const url = `${this.endpoint}/fund`;

        return axios.post(url, body);
    }

    /*
        Debits cards and credits wallet
     */

    static async debitCard(cardId: string, amount: number) {
        const body = {cardId: cardId, Amount: amount, secretKey: this.secretKey};
        const url = `${this.endpoint}/withdraw`;

        return axios.post(url, body);
    }

    /*
        Freezes card
     */

    static async freezeCard(cardId: string) {
        const body = {cardId: cardId, secretKey: this.secretKey};
        const url = `${this.endpoint}/freeze`;

        return axios.post(url, body);
    }

    /*
        Unfreezes card
     */

    static async unfreezeCard(cardId: string) {
        const body = {cardId: cardId, secretKey: this.secretKey};
        const url = `${this.endpoint}/unfreeze`;

        return axios.post(url, body);
    }

    /*
        Returns card details
     */

    static async cardDetails(cardId: string) {
        const body = {cardId: cardId, secretKey: this.secretKey};
        const url = `${this.endpoint}/details`;

        return axios.post(url, body);
    }

    /*
        Returns card transactions
     */

    static async transactions(cardId: string) {
        const body = {cardId: cardId, secretKey: this.secretKey};
        const url = `${this.endpoint}/transactions`;

        return axios.post(url, body);
    }

    /*
        Changes card pin
     */

    static async changePin(cardId: string, pin: string) {
        const body = {cardId: cardId, pin: pin, secretKey: this.secretKey};
        const url = `${this.endpoint}/changepin`;

        return axios.post(url, body);
    }
}

export default Card;
