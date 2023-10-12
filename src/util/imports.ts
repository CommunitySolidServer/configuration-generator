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
  generateImport('identity', 'pod', 'static'),
  generateImport('ldp', 'authentication', 'dpop-bearer'),
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

  imports.push(generateImport('app', 'init', choices.initializeRoot));
  imports.push(generateImport('http', 'notifications', choices.notifications));
  imports.push(generateImport('http', 'server-factory', choices.https === TRUE ? 'https' : 'http'));
  imports.push(generateImport('identity', 'access', choices.restrictAccountApi === TRUE ? 'restricted' : 'public'));
  imports.push(generateImport('identity', 'email', choices.email === TRUE ? 'example' : 'default'));
  imports.push(generateImport('identity', 'handler', choices.accounts));
  imports.push(generateImport('identity', 'oidc', choices.oidc === TRUE ? 'default' : 'disabled'));
  imports.push(generateImport('identity', 'ownership', choices.ownership === TRUE ? 'token' : 'unsafe-no-check'));
  imports.push(generateImport('ldp', 'handler', choices.ldp === TRUE ? 'default' : 'disabled'));
  // In v6 there are 2 relevant imports for ACP/WAC
  imports.push(...getAuthorizationImports(choices.authorization));
  imports.push(generateImport('storage', 'backend', choices.backend));
  imports.push(generateImport('storage', 'key-value', choices.internal));
  const rootStorage = [ 'initialize-root', 'initialize-root-pod' ].includes(choices.initializeRoot) && choices.subdomain === FALSE;
  imports.push(generateImport('storage', 'location', rootStorage ? 'root' : 'pod'));
  imports.push(generateImport('util', 'identifiers', choices.subdomain === TRUE ? 'subdomain' : 'suffix'));
  imports.push(generateImport('util', 'index', choices.index === TRUE ? 'example' : 'default'));
  imports.push(generateImport('util', 'resource-locker', choices.locking === FALSE ? 'debug-void' : choices.locking));

  return imports;
}
