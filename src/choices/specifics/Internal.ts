import { Choice } from '../Choice';

/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export const INTERNAL: Choice<'memory' | 'resource-store'> = {
  title: 'E-mail server',
  description: `How the data should be stored on the server.
  In-memory will cause the data to be lost when the server restarts.
  SPARQL options requires the <code>--sparqlEndpoint</code> CLI parameter to be set.`,
  options: [
    { key: 'memory', label: 'In-memory' },
    { key: 'resource-store', label: 'Same as data storage (see below)' },
  ],
  default: 'resource-store',
};
