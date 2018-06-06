import { Buyer, BuyerCreationInfo, BuyerInfo } from './buyer';
import { Endpoint } from './endpoint';
import { Transaction, TransactionCreationInfo, TransactionInfo } from './transaction';
import { Zoop } from './zoop';

export interface MarketplaceInfo {
    id: string;
    resource: 'marketplace';
    name: string;
    type: string;
    description: string | null;
    is_active: boolean;
    is_verified: boolean;
    account_balance: string;
    current_balance: string;
    decline_on_fail_security_code: boolean;
    decline_on_fail_zip_code: boolean;
    support_email: string;
    phone_number: string | null;
    statement_descriptor?: string;
    website: string | null;
    facebook: string | null;
    twitter: string | null;
    customer: any;
    api_keys: any[];
    transfer_enabled: boolean;
    debit_enabled: boolean;
    default_debit: any | null;
    default_credit: any | null;
    uri: string;
    created_at: string;
    updated_at: string;
    metadata: any;
}

export class Marketplace extends Endpoint<MarketplaceInfo> {
    constructor(zoop: Zoop, id: string) {
        super(zoop.base + `/marketplaces/${id}`, zoop.apiKey);
    }

    buyer(id: string): Buyer {
        return new Buyer(this, id);
    }

    transaction(id: string) {
        return new Transaction(this, id);
    }

    async get() {
        return this.request('GET');
    }

    listTransactions(query?: object) {
        return this.iterate<TransactionInfo>(query, '/transactions');
    }

    listBuyers(query?: object) {
        return this.iterate<BuyerInfo>(query, '/buyers');
    }

    async createBuyer(buyerInfo: BuyerCreationInfo) {
        return this.request('POST', buyerInfo, `/buyers`) as Promise<BuyerInfo>;
    }
}
