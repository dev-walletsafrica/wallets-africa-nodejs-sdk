import axios from 'axios';
import Self from './resources/self';
import Wallet from './resources/wallet';
import Card from './resources/cards';
import Payouts from './resources/payouts';
import Airtime from './resources/airtime';

/**
 * @class WalletAfrica
 * @author sheghun {@link https://github.com/sheghun}
 * {@link https://github.com/Alexjake660/wallets-africa-nodejs-sdk}
 *
 * Wallets Africa wrapper for communicating with the wallets africa api
 */
class WalletAfrica {
    public self = Self;
    public wallet = Wallet;
    public cards = Card;
    public payouts = Payouts;
    public airtime = Airtime;
    private _apiRoot = '';

    /**
     *
     * @param options - secret and public key
     */
    constructor(options: {secretKey: string; publicKey: string; sandbox: true}) {
        axios.defaults.headers.Authorization = `Bearer ${options.publicKey}`;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.defaults.baseURL = options.sandbox
            ? 'https://sandbox.wallets.africa'
            : 'https://api.wallets.africa';

        this.self.secretKey = options.secretKey;
        this.wallet.secretKey = options.secretKey;
        this.cards.secretKey = options.secretKey;
        this.payouts.secretKey = options.secretKey;
        this.airtime.secretKey = options.secretKey;
    }
}

export default WalletAfrica;
