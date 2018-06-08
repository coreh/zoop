import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { AnyResource, Resource } from './resource';

const API_BASE = 'https://api.zoop.ws/v1';

export class Zoop extends Endpoint {
    constructor(readonly apiKey: string) {
        super(API_BASE, apiKey);
    }

    public async request<T extends Resource = AnyResource>(method: string, payload?: object, route?: string) {
        return super.request<T>(method, payload, route);
    }

    public iterate<T extends Resource = AnyResource>(payload?: object, route?: string) {
        return super.iterate<T>(payload, route);
    }

    marketplace(id: string) {
        return new MarketplaceEndpoint(this, id);
    }
}
