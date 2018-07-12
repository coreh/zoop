import { Buyer, BuyerCreationInfo, BuyerEndpoint } from './buyer';
import { Endpoint } from './endpoint';
import { Resource } from './resource';
import { Seller, SellerCreationInfo, SellerEndpoint } from './seller';
import { BankAccountTokenCreationInfo, CardTokenCreationInfo, Token, TokenEndpoint } from './token';
import { Transaction, TransactionCreationInfo, TransactionEndpoint } from './transaction';
import { Zoop } from './zoop';

export interface Marketplace extends Resource {
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
    created_at: string;
    updated_at: string;
    metadata: any;
}

export class MarketplaceEndpoint extends Endpoint<Marketplace> {
    constructor(zoop: Zoop, id: string) {
        super(zoop.base + `/marketplaces/${id}`, zoop.apiKey, zoop.apiSecret);
    }

    buyer(id: string): BuyerEndpoint {
        return new BuyerEndpoint(this, id);
    }

    seller(id: string) {
        return new SellerEndpoint(this, id);
    }

    transaction(id: string) {
        return new TransactionEndpoint(this, id);
    }

    token(id: string) {
        return new TokenEndpoint(this, id);
    }

    async get() {
        return this.request('GET');
    }

    listBuyers(query?: object) {
        return this.iterate<Buyer>('/buyers', query);
    }

    listSellers(query?: object) {
        return this.iterate<Seller>('/sellers', query);
    }

    listTransactions(query?: object) {
        return this.iterate<Transaction>('/transactions', query);
    }

    async createBuyer(buyerInfo: BuyerCreationInfo) {
        return this.request('POST', '/buyers', buyerInfo) as Promise<Buyer>;
    }

    async createSeller(sellerInfo: SellerCreationInfo) {
        return this.request('POST', '/sellers', sellerInfo) as Promise<Seller>;
    }

    async createTransaction(transactionInfo: TransactionCreationInfo) {
        return this.request('POST', '/transactions', transactionInfo) as Promise<Transaction>;
    }

    async createCardToken(tokenInfo: CardTokenCreationInfo) {
        return this.request('POST', '/cards/tokens', tokenInfo) as Promise<Token>;
    }

    async createBankAccountToken(tokenInfo: BankAccountTokenCreationInfo) {
        return this.request('POST', '/bank_accounts/tokens', tokenInfo) as Promise<Token>;
    }
}
