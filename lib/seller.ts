import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { Resource } from './resource';

export interface SellerCreationInfo {

}

export interface Seller extends Resource {
    resource: 'seller';
}

export class SellerEndpoint extends Endpoint<Seller> {
    constructor(marketplace: MarketplaceEndpoint, id: string) {
        super(marketplace.base + `/sellers/${id}`, marketplace.apiKey, marketplace.apiSecret);
    }

    async get() {
        return this.request('GET');
    }
}
