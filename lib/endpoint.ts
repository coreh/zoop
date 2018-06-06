import FetchPonyfill from 'fetch-ponyfill';

import { btoa } from 'isomorphic-base64';
import QueryString from 'qs';
import { EndpointError } from './endpoint-error';

const { fetch, Headers } = FetchPonyfill();

enum StatusClass {
    Success = 2,
    Redirect = 3,
    ClientError = 4,
    ServerError = 5,
}

export abstract class Endpoint<T> {
    constructor(readonly base: string, readonly apiKey: string) { }

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

    protected async request<U = T>(method: string, payload?: object, route: string = ''): Promise<U | undefined> {
        const headers = new Headers({
            Authorization: `Basic ${btoa(`${this.apiKey}:${this.apiKey}`)}`,
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

        return await response.json();
    }

    protected async *iterate<U = T>(payload?: object, route: string = '') {
        let offset = 0;
        let data;
        do {
            data = await this.request('GET', { ...payload, offset }, route);
            for (const item of data.items) {
                yield item as U;
            }
            offset += data.limit;
        } while (data.has_more);
    }
}
