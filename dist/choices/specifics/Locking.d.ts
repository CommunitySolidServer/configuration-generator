import { Choice, FALSE } from '../Choice';
/**
 * Which locking method to use. None if undefined (indicate this is unsafe).
 */
export declare const LOCKING: Choice<'memory' | 'file' | 'redis' | typeof FALSE>;
