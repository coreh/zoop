import { Resource } from './resource';

export type VerificationStatus = 'unchecked' | 'pass';

export interface Card extends Resource {
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
