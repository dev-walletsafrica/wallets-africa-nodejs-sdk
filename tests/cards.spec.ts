import WalletAfrica from '../index';
import {assert} from 'chai';
import faker from 'faker';

/*
   Card resource tests file
 */

// The key is supplied from package.json under the scripts command
const walletAfrica = new WalletAfrica({
    secretKey: process.env.SECRET_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    sandbox: true,
});

const firstName = faker.name.firstName();

const phone1 = '8988989';

const cardId = '22';

const amount = 20;

const pin = '1234';

describe('Card resource tests', function() {
    it('Nigerian States and LGAs', async function() {
        const res = await walletAfrica.cards.nigerianStatesAndLgas();
        assert.equal(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            States: [],
        });
    });

    it('Identity Types', async function() {
        const res = await walletAfrica.cards.identityTypes();
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            IdType: {},
        });
    });

    it('Exchange Rates', async function() {
        const res = await walletAfrica.cards.exchangeRates();
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            rates: {},
        });
    });

    it('Create Card', async function() {
        const res = await walletAfrica.cards.createCard({
            amount: amount,
            firstName: firstName,
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            nameOnCard: firstName,
            dob: faker.date.past(),
            idNo: '9489',
            idType: 1,
            currency: 'USD',
            isPhysicalCard: false,
            stateid: 0,
            localid: 0,
            phoneNumber: phone1,
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Dollar virtual card created successfully',
            },
        });
    });

    it('Fund Card', async function() {
        const res = await walletAfrica.cards.fundCard(cardId, amount);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Card Funded Successfully',
            },
        });
    });

    it('Debit Card', async function() {
        const res = await walletAfrica.cards.debitCard(cardId, amount);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Card debit was successful',
            },
        });
    });

    it('Freeze Card', async function() {
        const res = await walletAfrica.cards.freezeCard(cardId);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Your dollar card has just been frozen',
            },
        });
    });

    it('Unfreeze Card', async function() {
        const res = await walletAfrica.cards.unfreezeCard(cardId);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'You just successfully defrosted your dollar card',
            },
        });
    });

    it('Card Details', async function() {
        const res = await walletAfrica.cards.cardDetails(cardId);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Naira card details fetched  successfully',
            },
        });
    });

    it('Card Transactions', async function() {
        const res = await walletAfrica.cards.transactions(cardId);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'transactions fetched  successfully',
            },
        });
    });

    it('Change Pin', async function() {
        const res = await walletAfrica.cards.changePin(cardId, pin);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Card pin changed successfully',
            },
        });
    });
});
