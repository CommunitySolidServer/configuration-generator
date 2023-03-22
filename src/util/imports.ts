import { FALSE, TRUE } from '../choices/Choice';
import { Choices } from '../choices/choices';

export type Import = `css:config/${string}/${string}/${string}.json`;

/**
 * Generates an import string for the given settings.
 */
export function generateImport(group: string, entry: string, choice: string): Import {
  return `css:config/${group}/${entry}/${choice}.json`;
}

/**
 * Fixed import values that never change.
 */
export const DEFAULT_IMPORTS: readonly Import[] = [
  generateImport('app', 'main', 'default'),
  generateImport('app', 'variables', 'default'),
  generateImport('http', 'handler', 'default'),
  generateImport('http', 'static', 'default'),
  generateImport('identity', 'handler', 'default'),
  generateImport('identity', 'pod', 'static'),
  generateImport('ldp', 'authentication', 'dpop-bearer'),
  generateImport('ldp', 'handler', 'default'),
  generateImport('ldp', 'metadata-parser', 'default'),
  generateImport('ldp', 'metadata-writer', 'default'),
  generateImport('ldp', 'modes', 'default'),
  generateImport('storage', 'middleware', 'default'),
  generateImport('util', 'logging', 'winston'),
  generateImport('util', 'representation-conversion', 'default'),
  generateImport('util', 'variables', 'default'),
] as const;

/**
 * The server factory import depends on 2 choices.
 */
function getServerFactoryImport(webSockets: boolean, https: boolean): Import {
  if (webSockets) {
    return generateImport('http', 'server-factory', https ? 'https-websockets' : 'websockets');
  }
  return generateImport('http', 'server-factory', https ? 'https-no-websockets' : 'no-websockets');
}

/**
 * Generate all necessary imports based on the provided choices.
 */
export function generateImports(choices: Choices): Import[] {
  const imports: Import[] = [ ...DEFAULT_IMPORTS ];

  if (choices.backend === 'sparql' && choices.internal === 'resource-store') {
    throw new Error('SPARQL backend can not be chosen if the backend is used for internal storage.');
  }
  if (choices.backend === 'regex' && choices.internal === 'memory') {
    throw new Error('Combining the regex backend with in-memory internal storage does not make sense.');
  }
  if (choices.registration === FALSE && choices.setup === FALSE && choices.initializeRoot === FALSE) {
    throw new Error('There would be no way to write data to this server.');
  }

  imports.push(generateImport('app', 'init', choices.initializeRoot === TRUE ? 'initialize-root' : 'default'));
  imports.push(generateImport('app', 'setup', choices.setup === TRUE ? 'required' : 'disabled'));
  imports.push(generateImport('http', 'middleware', choices.webSockets === TRUE ? 'websockets' : 'no-websockets'));
  imports.push(getServerFactoryImport(choices.webSockets === TRUE, choices.https === TRUE));
  imports.push(generateImport('identity', 'access', choices.restrictAccountApi === TRUE ? 'restricted' : 'public'));
  imports.push(generateImport('identity', 'email', choices.email === TRUE ? 'example' : 'default'));
  imports.push(generateImport('identity', 'ownership', choices.ownership === TRUE ? 'token' : 'unsafe-no-check'));
  imports.push(generateImport('identity', 'registration', choices.registration === TRUE ? 'enabled' : 'disabled'));
  // In v5 there are 2 relevant imports for WAC
  imports.push(generateImport('ldp', 'authorization', choices.authorization === 'wac' ? 'webacl' : 'allow-all'));
  imports.push(generateImport('util', 'auxiliary', choices.authorization === 'wac' ? 'acl' : 'no-acl'));
  imports.push(generateImport('storage', 'backend', choices.backend));
  imports.push(generateImport('storage', 'key-value', choices.internal));
  imports.push(generateImport('util', 'identifiers', choices.subdomain === TRUE ? 'subdomain' : 'suffix'));
  imports.push(generateImport('util', 'index', choices.index === TRUE ? 'example' : 'default'));
  imports.push(generateImport('util', 'resource-locker', choices.locking === FALSE ? 'debug-void' : choices.locking));

  return imports;
}
