import { Endpoint } from './endpoint';
import { Marketplace } from './marketplace';

export interface TransactionCreationInfo {
}

export interface TransactionInfo {
}

export class Transaction extends Endpoint<TransactionInfo> {
    constructor(marketplace: Marketplace, id: string) {
        super(marketplace.base + `/transactions/${id}`, marketplace.apiKey);
    }

    async get() {
        return this.request('GET');
    }
}
