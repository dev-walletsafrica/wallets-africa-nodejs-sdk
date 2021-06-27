import WalletAfrica from '../index';
import {assert} from 'chai';

/*
   Airtime resource tests file
 */

// The key is supplied from package.json under the scripts command
const walletAfrica = new WalletAfrica({
    secretKey: process.env.SECRET_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    sandbox: true,
});

describe('Airtime resource tests', function() {
    it('Airtime Providers', async function() {
        const res = await walletAfrica.airtime.airtimeProviders();
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            Providers: [],
        });
    });

    it('Airtime Purchase', async function() {
        const res = await walletAfrica.airtime.airtimePurchase({
            Code: 'mtn',
            Amount: '100',
            PhoneNumber: '07068260000',
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '100',
            Message: 'Airtime purchased successfully',
        });
    });
});
