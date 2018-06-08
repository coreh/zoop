import { Buyer } from './buyer';
import { Marketplace } from './marketplace';
import { Seller } from './seller';
import { Boleto, Card, Transaction } from './transaction';

export interface Resource {
    id: string;
    resource: string;
    uri?: string;
}

export type AnyResource = Boleto | Buyer | Card | Marketplace | Seller | Transaction;
