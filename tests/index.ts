import Zoop from '../lib';

const TEST_API_KEY = 'zpk_test_EzCkzFFKibGQU6HFq7EYVuxI';
const TEST_MARKETPLACE_ID = '3249465a7753536b62545a6a684b0000';
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

it('should create the API client', async () => {
    new Zoop(TEST_API_KEY);
});

it('should retrieve marketplace info', async () => {
    const zoop = new Zoop(TEST_API_KEY);
    const marketplaceInfo = await zoop.marketplace(TEST_MARKETPLACE_ID).get();
    expect(marketplaceInfo).toBeDefined();
});

it('should create/retrieve buyers', async () => {
    const zoop = new Zoop(TEST_API_KEY);
    const marketplace = zoop.marketplace(TEST_MARKETPLACE_ID);

    const createdBuyerInfo = await marketplace.createBuyer(TEST_BUYER_CREATION_INFO);
    expect(createdBuyerInfo).toBeDefined();
    expect(typeof createdBuyerInfo.id).toBe('string');

    const retrievedBuyerInfo = await marketplace.buyer(createdBuyerInfo.id).get();
    expect(retrievedBuyerInfo).toBeDefined();
    expect(retrievedBuyerInfo).toEqual(createdBuyerInfo);
});
