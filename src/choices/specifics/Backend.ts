import { Choice } from '../Choice';

/**
 * How to store the data.
 * `regex` writes internal data to the file system and data to SPARQL.
 */
export const BACKEND: Choice<'memory' | 'file' | 'sparql' | 'pod-quota-file' | 'regex'> = {
  title: 'E-mail server',
  description: `How the data should be stored on the server.
  In-memory will cause the data to be lost when the server restarts.
  SPARQL options requires the <code>--sparqlEndpoint</code> CLI parameter to be set.`,
  options: [
    { key: 'memory', label: 'In-memory' },
    { key: 'file', label: 'File system' },
    { key: 'sparql', label: 'SPARQL endpoint (requires in-memory internal storage)' },
    { key: 'pod-quota-file', label: 'File system (with a pod quota)' },
    { key: 'regex', label: 'SPARQL endpoint (using file system for internal data)' }
  ],
  default: 'file',
};
