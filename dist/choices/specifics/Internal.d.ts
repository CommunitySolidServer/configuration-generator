import { Choice } from '../Choice';
/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export declare const INTERNAL: Choice<'memory' | 'resource-store'>;
