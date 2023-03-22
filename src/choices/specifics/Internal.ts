import { Choice } from '../Choice';

/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export const INTERNAL = {
  name: 'internal',
  title: 'Internal storage',
  description: `How the data should be stored on the server.
  In-memory will cause the data to be lost when the server restarts.
  SPARQL options requires the <code>--sparqlEndpoint</code> CLI parameter to be set.`,
  options: [
    { value: 'memory', label: 'In-memory' },
    { value: 'resource-store', label: 'Same as data storage (see below)' },
  ],
  default: 'resource-store',
} as const satisfies Choice<'memory' | 'resource-store'>;
