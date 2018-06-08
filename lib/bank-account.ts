import { Resource } from './resource';
import { VerificationStatus } from './verification-status';

export interface BankAccount extends Resource {
    resource: 'bank_account';
    holder_name: string;
    taxpayer_id: string;
    description: string | null;
    bank_name: string;
    bank_code: string;
    type: 'Checking' | 'Savings';
    last4_digits: string;
    country_code: string;
    routing_number: string;
    phone_number: string | null;
    is_active: boolean;
    is_verified: boolean;
    debitable: boolean;
    customer: string | null;
    fingerprint: string;
    address: any | null;
    verification_checklist:
    {
        postal_code_check: VerificationStatus;
        address_line1_check: VerificationStatus;
        deposit_check: VerificationStatus;
    };
    metadata: any;
    created_at: string;
    updated_at: string;
}
