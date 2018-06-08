import { BankAccount } from './bank-account';
import { Card } from './card';
import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { Resource } from './resource';

export interface BankAccountTokenCreationInfo {
    holder_name: string;
    bank_code: string;
    routing_number: string;
    account_number: string;
    taxpayer_id?: string;
    ein?: string;
    type: 'checking' | 'savings';
}

export interface CardTokenCreationInfo {
    holder_name: string;
    expiration_month: string;
    expiration_year: string;
    card_number: string;
    security_code: string;
}

export interface BankAccountToken extends Resource {
    resource: 'token';
    used: boolean;
    type: 'bank_account';
    bank_account: BankAccount;
    created_at: string;
    updated_at: string;
}

export interface CardToken extends Resource {
    resource: 'token';
    used: boolean;
    type: 'card';
    card: Card;
    created_at: string;
    updated_at: string;
}

export type Token = BankAccountToken | CardToken;

export class TokenEndpoint extends Endpoint<Token> {
    constructor(marketplace: MarketplaceEndpoint, id: string) {
        super(marketplace.base + `/tokens/${id}`, marketplace.apiKey);
    }

    async get() {
        return this.request('GET');
    }
}
