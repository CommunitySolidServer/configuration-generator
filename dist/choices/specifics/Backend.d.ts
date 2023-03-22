import { Choice } from '../Choice';
/**
 * How to store the data.
 * `regex` writes internal data to the file system and data to SPARQL.
 */
export declare const BACKEND: Choice<'memory' | 'file' | 'sparql' | 'pod-quota-file' | 'regex'>;
