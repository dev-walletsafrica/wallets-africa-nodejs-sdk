import WalletAfrica from '../index';
import {assert} from 'chai';

/*
   Payouts resource tests file
 */

// The key is supplied from package.json under the scripts command
const walletAfrica = new WalletAfrica({
    secretKey: process.env.SECRET_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    sandbox: true,
});

describe('Payouts resource tests', function() {
    it('Bank Transfer Details', async function() {
        const res = await walletAfrica.payouts.bankTransferDetails('2578615312');
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            Message: 'Transaction has been queued for processing',
        });
    });

    it('Bank Account Transfer', async function() {
        try {
            const res = await walletAfrica.payouts.bankAccountTransfer({
                BankCode: '058',
                AccountNumber: '0116477742',
                AccountName: 'Eduvie Agada',
                TransactionReference: (Date.now() as any) as string,
                Amount: 50,
                Narration: 'node sdk test narration',
            });
            assert.strictEqual(res.status, 200);
            assert.containsAllDeepKeys(res.data, {
                ResponseCode: '200',
                Message: 'Transfer Pending',
            });
        } catch (err) {
            if (err.response) {
                const res = err.response;
                assert.deepEqual(res.data.Response, {
                    ResponseCode: '400',
                    Message:
                        'Your wallet balance is too low to complete this transaction. Please fund your wallet.',
                });
            } else {
                throw err;
            }
        }
    });

    it('Account Enquiry', async function() {
        const res = await walletAfrica.payouts.accountEnquiry({
            accountNumber: '0200556677',
            bankCode: '058',
        });
        assert.strictEqual(res.status, 200);
        assert.containsAllDeepKeys(res.data, {
            ResponseCode: '200',
            Message: 'Bank Account Enquiry Successful',
        });
    });

    it('Get Banks', async function() {
        const res = await walletAfrica.payouts.getBanks();
        assert.strictEqual(res.status, 200);
    });
});
