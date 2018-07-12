import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { AnyResource, Resource } from './resource';

const API_BASE = 'https://api.zoop.ws/v1';

export class Zoop extends Endpoint {
    constructor(readonly apiKey: string, readonly apiSecret: string = apiKey) {
        super(API_BASE, apiKey, apiSecret);
    }

    marketplace(id: string) {
        return new MarketplaceEndpoint(this, id);
    }
}
