export * from './boleto';
export * from './buyer';
export * from './endpoint-error';
export * from './endpoint';
export * from './marketplace';
export * from './resource';
export * from './seller';
export * from './token';
export * from './transaction';
export * from './verification-status';
export * from './zoop';

import { Zoop } from './zoop';

export default Zoop;

/*
 * Async iterator polyfill
 */

if (!(Symbol as any).asyncIterator) {
    (Symbol as any).asyncIterator = Symbol.for('Symbol.asyncIterator');
}
