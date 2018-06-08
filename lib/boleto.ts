import { Resource } from './resource';

export interface Boleto extends Resource {
    resource: 'boleto';
    description: string;
    reference_number: string;
    document_number: string;
    expiration_date: string;
    recipient: string;
    bank_code: string;
    customer: string | null;
    address: string | null;
    sequence: string;
    url: string;
    accepted: false;
    printed: false;
    downloaded: false;
    fingerprint: null;
    paid_at: null;
    barcode: string;
    metadata: any;
    created_at: string;
    updated_at: string;
}
