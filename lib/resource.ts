import { Boleto } from './boleto';
import { Buyer } from './buyer';
import { Card } from './card';
import { Marketplace } from './marketplace';
import { Seller } from './seller';
import { Transaction } from './transaction';

export interface Resource {
    id: string;
    resource: string;
    uri?: string;
}

export type AnyResource = Boleto | Buyer | Card | Marketplace | Seller | Transaction;
