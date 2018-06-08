import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { AnyResource, Resource } from './resource';

const API_BASE = 'https://api.zoop.ws/v1';

export class Zoop extends Endpoint {
    constructor(readonly apiKey: string) {
        super(API_BASE, apiKey);
    }

    public async request<T extends Resource = AnyResource>(method: string, route?: string, payload?: object) {
        return super.request<T>(method, route, payload);
    }

    public iterate<T extends Resource = AnyResource>(route?: string, payload?: object) {
        return super.iterate<T>(route, payload);
    }

    marketplace(id: string) {
        return new MarketplaceEndpoint(this, id);
    }
}
