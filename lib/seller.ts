import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';

export interface SellerCreationInfo {
}

export interface Seller {
    id: string;
    resource: 'seller';
}

export class SellerEndpoint extends Endpoint<Seller> {
    constructor(marketplace: MarketplaceEndpoint, id: string) {
        super(marketplace.base + `/sellers/${id}`, marketplace.apiKey);
    }

    async get() {
        return this.request('GET');
    }
}
