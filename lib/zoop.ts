import { Endpoint } from './endpoint';
import { Marketplace } from './marketplace';

const API_BASE = 'https://api.zoop.ws/v1';

export class Zoop extends Endpoint<never> {
    constructor(readonly apiKey: string) {
        super(API_BASE, apiKey);
    }

    marketplace(id: string) {
        return new Marketplace(this, id);
    }
}
