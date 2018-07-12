import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { Resource } from './resource';

export interface BuyerCreationInfo {
    first_name: string;
    last_name: string;
    taxpayer_id: string;
    description?: string;
    email: string;
    phone_number?: string;
    facebook?: string;
    twitter?: string;
    address: {
        line1: string;
        line2?: string;
        line3?: string;
        neighborhood: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
    };
    metadata?: any;
}

export interface Buyer extends Resource {
    resource: 'buyer';
    status: string;
    account_balance: string;
    current_balance: string;
    first_name: string;
    last_name: string;
    taxpayer_id: string;
    description: string | null;
    email: string;
    phone_number: string | null;
    facebook: string | null;
    twitter: string | null;
    address: {
        line1: string;
        line2: string | null;
        line3: string | null;
        neighborhood: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
    };
    delinquent: boolean;
    payment_methods: any | null;
    default_debit: any | null;
    default_credit: any | null;
    default_receipt_delivery_method: any | null;
    metadata: any;
}

export class BuyerEndpoint extends Endpoint<Buyer> {
    constructor(marketplace: MarketplaceEndpoint, id: string) {
        super(marketplace.base + `/buyers/${id}`, marketplace.apiKey, marketplace.apiSecret);
    }

    async get() {
        return this.request('GET');
    }
}
