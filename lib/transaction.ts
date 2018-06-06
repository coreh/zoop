import { Endpoint } from './endpoint';
import { Marketplace } from './marketplace';

export interface TransactionCreationInfo {

}

export interface TransactionInfo {
    id: string;
    resource: 'transaction';
    status: string;
    amount: string;
    original_amount: string;
    currency: string;
    description: string | null;
    payment_type: string;
    transaction_number: string;
    gateway_authorizer: string;
    app_transaction_uid: string | null;
    refunds: any | null;
    rewards: any | null;
    discounts: any | null;
    pre_authorization: any | null;
    sales_receipt: string | null;
    on_behalf_of: string;
    customer: any | null;
    statement_descriptor: string;
    payment_method: any | null;
    point_of_sale: any | null;
    installment_plan: any | null;
    refunded: boolean;
    voided: boolean;
    captured: boolean;
    fees: string;
    fee_details: any[];
    location_latitude: string | null;
    location_longitude: string | null;
    individual: any | null;
    business: any | null;
    uri: string;
    metadata: any;
    expected_on: string;
    created_at: string;
    updated_at: string;
    split_rules: any[];
    reference_id: string;
    payment_authorization: any;
}

export class Transaction extends Endpoint<TransactionInfo> {
    constructor(marketplace: Marketplace, id: string) {
        super(marketplace.base + `/transactions/${id}`, marketplace.apiKey);
    }

    async get() {
        return this.request('GET');
    }
}
