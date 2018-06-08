import Zoop, { Marketplace } from '../lib';

jest.setTimeout(20_000);

const TEST_API_KEY = 'zpk_test_EzCkzFFKibGQU6HFq7EYVuxI';
const TEST_NONEXISTENT_ID = '87df28a2236e173b45ea8b0d049cf62b';
const TEST_MARKETPLACE_ID = '3249465a7753536b62545a6a684b0000';
const TEST_BUYER_ID = '19355ed168914b57b564e23ce41b48c3';
const TEST_SELLER_ID = '4bd9e003c1b143d9b7dfc1fd04d43ef9';
const TEST_TRANSACTION_ID = '01ee71b399144a20822ea93c965974d3';
const TEST_BUYER_CREATION_INFO = {
    first_name: 'Tester',
    last_name: 'McTester',
    taxpayer_id: '167.784.818-97',
    description: 'Some Tester',
    email: 'tester.silva@gmail.com',
    address: {
        line1: 'Rua Testing',
        city: 'Belo Horizonte',
        state: 'MG',
        country_code: 'BR',
        postal_code: '30200100',
        neighborhood: 'Test',
    },
};
const TEST_TRANSACTION_BOLETO_CREATION_INFO = {
    amount: '1000',
    currency: 'BRL',
    on_behalf_of: TEST_SELLER_ID,
    payment_type: 'boleto',
};

let zoop: Zoop;
let marketplace: Marketplace;

beforeAll(() => {
    zoop = new Zoop(TEST_API_KEY);
    marketplace = zoop.marketplace(TEST_MARKETPLACE_ID);
});

describe('marketplace', () => {
    it('should retrieve marketplace info', async () => {
        const marketplaceInfo = await zoop.marketplace(TEST_MARKETPLACE_ID).get();
        expect(marketplaceInfo).toBeDefined();
        expect(marketplaceInfo).toBeInstanceOf(Object);
        expect(marketplaceInfo!.id).toEqual(TEST_MARKETPLACE_ID);
    });

    it('should throw when attempting to access another marketplace', async () => {
        const marketplaceInfoPromise = zoop.marketplace(TEST_NONEXISTENT_ID).get();
        expect.assertions(1);
        await expect(marketplaceInfoPromise).rejects.toBeInstanceOf(Error);
    });
});

describe('buyer', () => {
    it('should create buyer', async () => {
        const buyerInfo = await marketplace.createBuyer(TEST_BUYER_CREATION_INFO);
        expect(buyerInfo).toBeDefined();
        expect(buyerInfo).toBeInstanceOf(Object);
        expect(typeof buyerInfo.id).toBe('string');
    });

    it('should retrieve buyer', async () => {
        const buyerInfo = await marketplace.buyer(TEST_BUYER_ID).get();
        expect(buyerInfo).toBeDefined();
        expect(buyerInfo).toBeInstanceOf(Object);
        expect(buyerInfo!.id).toEqual(TEST_BUYER_ID);
    });

    it('should return undefined when buyer does not exist', async () => {
        const buyerInfo = await marketplace.buyer(TEST_NONEXISTENT_ID).get();
        expect(buyerInfo).toBeUndefined();
    });

    it('should list buyers', async () => {
        let count = 0;

        for await (const buyer of marketplace.listBuyers()) {
            expect(buyer).toBeDefined();

            // No need to iterate over all buyers
            if (++count > 200) {
                break;
            }
        }
    });
});

describe('seller', () => {
    it('should list sellers', async () => {
        let count = 0;

        for await (const seller of marketplace.listSellers()) {
            expect(seller).toBeDefined();

            // No need to iterate over all sellers
            if (++count > 200) {
                break;
            }
        }
    });

    it('should retrieve seller', async () => {
        const sellerInfo = await marketplace.seller(TEST_SELLER_ID).get();
        expect(sellerInfo).toBeDefined();
        expect(sellerInfo).toBeInstanceOf(Object);
        expect(sellerInfo!.id).toEqual(TEST_SELLER_ID);
    });
});

describe('transaction', () => {
    describe('transaction creation', () => {
        it('should create a transaction with boleto payment method', async () => {
            const transactionInfo = await marketplace.createTransaction(TEST_TRANSACTION_BOLETO_CREATION_INFO);
            expect(transactionInfo).toBeDefined();
        });
    });

    it('should retrieve transaction', async () => {
        const transactionInfo = await marketplace.transaction(TEST_TRANSACTION_ID).get();
        expect(transactionInfo).toBeDefined();
        expect(transactionInfo).toBeInstanceOf(Object);
        expect(transactionInfo!.id).toEqual(TEST_TRANSACTION_ID);
    });

    it('should return undefined when transaction does not exist', async () => {
        const transactionInfo = await marketplace.transaction(TEST_NONEXISTENT_ID).get();
        expect(transactionInfo).toBeUndefined();
    });

    it('should list transactions', async () => {
        let count = 0;

        for await (const transaction of marketplace.listTransactions()) {
            expect(transaction).toBeDefined();

            // No need to iterate over all transactions
            if (++count > 200) {
                break;
            }
        }
    });
});
