import { Endpoint } from './endpoint';
import { Marketplace } from './marketplace';

export interface SellerCreationInfo {
}

export interface SellerInfo {
    id: string;
    resource: 'seller';
}

export class Seller extends Endpoint<SellerInfo> {
    constructor(marketplace: Marketplace, id: string) {
        super(marketplace.base + `/sellers/${id}`, marketplace.apiKey);
    }

    async get() {
        return this.request('GET');
    }
}
