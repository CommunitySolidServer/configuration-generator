import { Choice } from '../Choice';

/**
 * How to store the data.
 * `regex` writes internal data to the file system and data to SPARQL.
 */
export const BACKEND = {
  id: 'backend',
  label: 'Data storage',
  description: `How the data should be stored on the server.
  In-memory will cause the data to be lost when the server restarts.
  File options can use the <code>--rootFilePath/-f</code> CLI parameter to choose the root data folder to use,
  which defaults to the current folder.
  SPARQL options require the <code>--sparqlEndpoint/-s</code> CLI parameter to be set.`,
  options: [
    { value: 'memory', label: 'In-memory' },
    { value: 'file', label: 'File system' },
    { value: 'sparql', label: 'SPARQL endpoint (requires in-memory internal storage)' },
    { value: 'pod-quota-file', label: 'File system (with a pod quota)' },
    { value: 'regex', label: 'SPARQL endpoint (using file system for internal data)' }
  ],
  default: 'file',
} as const satisfies Choice<'memory' | 'file' | 'sparql' | 'pod-quota-file' | 'regex'>;
