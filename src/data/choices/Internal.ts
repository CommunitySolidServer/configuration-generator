import { Choice } from '../Choice';

/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export const INTERNAL = {
  id: 'internal',
  label: 'Internal storage',
  description: `How internal data should be stored, such as account data.
  Data stored in memory will be lost on server restart.`,
  options: [
    { value: 'memory', label: 'In-memory' },
    { value: 'resource-store', label: 'Same as data storage' },
  ],
  default: 'resource-store',
} as const satisfies Choice<'memory' | 'resource-store'>;
