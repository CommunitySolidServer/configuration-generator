import { FALSE, TRUE } from '../data/Choice';
import { Choices } from '../data/data';

// Also allow empty strings to indicate an import was left out
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
  generateImport('http', 'middleware', 'default'),
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
function* getAuthorizationImports(authorization: Choices['authorization']): Iterable<Import> {
  if (authorization === 'wac') {
    yield generateImport('ldp', 'authorization', 'webacl');
    yield generateImport('util', 'auxiliary', 'acl');
  } else if (authorization === 'acp') {
    yield generateImport('ldp', 'authorization', 'acp');
    yield generateImport('util', 'auxiliary', 'acr');
  } else if (authorization === FALSE) {
    yield generateImport('ldp', 'authorization', 'allow-all');
    yield generateImport('util', 'auxiliary', 'empty');
  }
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
    throw new Error('There would be no way to write data to this server. You need to enable one of registration, setup, or root initialization.');
  }
  if (choices.registration === TRUE && choices.initializeRoot === TRUE && choices.subdomain === FALSE) {
    throw new Error('Initializing the root and enabling registration is only possible when subdomains are used, as nested storages are not allowed in Solid.');
  }

  imports.push(generateImport('app', 'init', choices.initializeRoot === TRUE ? 'initialize-root' : 'default'));
  imports.push(generateImport('app', 'setup', choices.setup === TRUE ? 'required' : 'disabled'));
  imports.push(generateImport('http', 'notifications', choices.notifications));
  imports.push(generateImport('http', 'server-factory', choices.https === TRUE ? 'https' : 'http'));
  imports.push(generateImport('identity', 'access', choices.restrictAccountApi === TRUE ? 'restricted' : 'public'));
  imports.push(generateImport('identity', 'email', choices.email === TRUE ? 'example' : 'default'));
  imports.push(generateImport('identity', 'ownership', choices.ownership === TRUE ? 'token' : 'unsafe-no-check'));
  imports.push(generateImport('identity', 'registration', choices.registration === TRUE ? 'enabled' : 'disabled'));
  // In v6 there are 2 relevant imports for ACP/WAC
  imports.push(...getAuthorizationImports(choices.authorization));
  imports.push(generateImport('storage', 'backend', choices.backend));
  imports.push(generateImport('storage', 'key-value', choices.internal));
  imports.push(generateImport('util', 'identifiers', choices.subdomain === TRUE ? 'subdomain' : 'suffix'));
  imports.push(generateImport('util', 'index', choices.index === TRUE ? 'example' : 'default'));
  imports.push(generateImport('util', 'resource-locker', choices.locking === FALSE ? 'debug-void' : choices.locking));

  return imports;
}
