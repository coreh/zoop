import FetchPonyfill from 'fetch-ponyfill';

import { btoa } from 'isomorphic-base64';
import QueryString from 'qs';
import { EndpointError } from './endpoint-error';
import { AnyResource, Resource } from './resource';

const { fetch, Headers } = FetchPonyfill();

enum StatusClass {
    Success = 2,
    Redirect = 3,
    ClientError = 4,
    ServerError = 5,
}

export abstract class Endpoint<T extends Resource = AnyResource> {
    constructor(readonly base: string, readonly apiKey: string, readonly apiSecret: string) { }

    private static statusClass(statusCode: number): StatusClass {
        return Math.floor(statusCode / 100);
    }

    private static async assertSuccess(response: Response) {
        if (Endpoint.statusClass(response.status) !== StatusClass.Success) {
            const body = await response.json();
            const message = body.error ? body.error.message : 'Error while attempting to call the Zoop API';
            throw new EndpointError(response.status, message);
        }
    }

    public async request<U extends Resource = T>(method: string, route: string = '', payload?: object): Promise<U | undefined> {
        const headers = new Headers({
            Authorization: `Basic ${btoa(`${this.apiKey}:${this.apiSecret}`)}`,
        });

        let uri;
        let body;
        if (method === 'GET') {
            uri = this.base + route + '?' + QueryString.stringify(payload);
        } else {
            headers.set('Content-Type', 'application/json');
            uri = this.base + route;
            body = JSON.stringify(payload);
        }

        const response = await fetch(uri, {
            method,
            headers,
            body,
        });

        if (method === 'GET' && response.status === 404) {
            return undefined;
        }

        await Endpoint.assertSuccess(response);

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            // Work around malformed JSON response with escaped '
            return JSON.parse(text.replace(/\\\'/g, '\''));
        }
    }

    public async *iterate<U extends Resource = T>(route: string = '', payload?: object) {
        let offset = 0;
        let data;
        do {
            data = await this.request('GET', route, { ...payload, offset });
            for (const item of data.items) {
                yield item as U;
            }
            offset += data.items.length;
        } while (offset < parseInt(data.total, 10));
    }
}
