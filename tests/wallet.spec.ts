import WalletAfrica from '../index';
import {assert} from 'chai';
import faker from 'faker';

/*
   Wallet resource tests file
 */

// The key is supplied from package.json under the scripts command
const walletAfrica = new WalletAfrica({
    secretKey: process.env.SECRET_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    sandbox: true,
});

const phone1 = '08023634895';

const phone2 = '08057998539';

const phone3 = '2348148657415';

const phone4 = '13990205533';

const phone5 = '2344049658848';

const email = 'ralphdibny@centralcity.com';

describe('Wallet resource tests', function() {
    it('Debit', async function() {
        try {
            const res = await walletAfrica.wallet.debit({
                transactionReference: (Date.now() as any) as string,
                amount: 10,
                phoneNumber: phone1,
            });
            assert.equal(res.status, 200);
            assert.containsAllDeepKeys(res.data, {
                Response: {
                    ResponseCode: '200',
                    Message: 'Transaction Completed successfully',
                },
            });
        } catch (err) {
            if (err.response) {
                const res = err.response;
                assert.deepEqual(res.data.Response, {
                    ResponseCode: '400',
                    Message: 'Insufficient Funds',
                });
            } else {
                throw err;
            }
        }
    });

    it('Credit', async function() {
        try {
            const res = await walletAfrica.wallet.credit({
                transactionReference: (Date.now() as any) as string,
                amount: 10,
                phoneNumber: phone2,
            });
            assert.strictEqual(res.status, 200);
            assert.containsAllDeepKeys(res.data, {
                Response: {
                    ResponseCode: '200',
                    Message: 'Transaction Completed successfully',
                },
            });
        } catch (err) {
            if (err.response) {
                const res = err.response;
                assert.deepEqual(res.data.Response, {
                    ResponseCode: '400',
                    Message: 'Insufficient Funds',
                });
            } else {
                throw err;
            }
        }
    });

    it('Generate', async function() {
        const res = await walletAfrica.wallet.generate({
            dateOfBirth: faker.date.past(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Wallet created successfully',
            },
        });
    });

    it('Retrieve Account Number', async function() {
        const res = await walletAfrica.wallet.retrieveAccountNumber(phone3);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'User NUBAN Retrieved',
            },
        });
    });

    it('Set Password', async function() {
        const res = await walletAfrica.wallet.setPassword({
            password: 'p1ert0tuml0c0m0t0r',
            phoneNumber: phone4,
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            Message: 'Password set successfully',
        });
    });

    it('Set Pin', async function() {
        const res = await walletAfrica.wallet.setPin({
            transactionPin: '0799',
            phoneNumber: phone4,
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            Message: 'Transaction pin reset successfully',
        });
    });

    it('Transactions', async function() {
        const res = await walletAfrica.wallet.transactions({
            skip: 0,
            take: 10,
            dateFrom: '2020-01-15',
            dateTo: '2020-01-15',
            transactionType: 1,
            phoneNumber: phone2,
            transactionPin: '1111',
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Transactions Retrieved successfully',
            },
        });
    });

    it('Get User By Phone', async function() {
        const res = await walletAfrica.wallet.getUserByPhone(phone1);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Successful',
            },
        });
    });

    it('Get User By Email', async function() {
        const res = await walletAfrica.wallet.getUserByEmail(email);
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Successful',
            },
        });
    });

    it('Get Balance', async function() {
        const res = await walletAfrica.wallet.getBalance({
            phoneNumber: phone5,
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            Response: {
                ResponseCode: '200',
                Message: 'Balance Retrieved successfully',
            },
        });
    });
});
