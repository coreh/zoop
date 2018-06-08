import { Endpoint } from './endpoint';
import { Marketplace } from './marketplace';

type PaymentType = 'boleto' | 'credit' | 'debit' | 'wallet';

type VerificationStatus = 'unchecked' | 'pass';

interface CardInfo {
    id: string;
    resource: 'card';
    description: string | null;
    card_brand: string;
    first4_digits: string;
    last4_digits: string;
    expiration_month: string;
    expiration_year: string;
    holder_name: string;
    is_active: boolean;
    is_valid: boolean;
    is_verified: boolean;
    customer: string;
    fingerprint: string;
    address: any | null;
    verification_checklist: {
        postal_code_check: VerificationStatus;
        security_code_check: VerificationStatus;
        address_line1_check: VerificationStatus;
    };
}

interface BoletoInfo {
    id: string;
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
    uri: string;
    barcode: string;
    metadata: any;
    created_at: string;
    updated_at: string;
}

export interface TransactionCreationInfo {
    amount: string;
    currency: string;
    on_behalf_of: string;
    payment_type: PaymentType;
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
    payment_method: CardInfo | BoletoInfo | null;
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
