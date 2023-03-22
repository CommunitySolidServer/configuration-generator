import { FALSE, TRUE } from '../choices/Choice';
import { AUTHORIZATION } from '../choices/specifics/Authorization';
import { BACKEND } from '../choices/specifics/Backend';
import { EMAIL } from '../choices/specifics/Email';
import { HTTPS } from '../choices/specifics/Https';
import { INDEX } from '../choices/specifics/Index';
import { INITIALIZE_ROOT } from '../choices/specifics/InitializeRoot';
import { INTERNAL } from '../choices/specifics/Internal';
import { LOCKING } from '../choices/specifics/Locking';
import { OWNERSHIP } from '../choices/specifics/Ownership';
import { REGISTRATION } from '../choices/specifics/Registration';
import { RESTRICT_ACCOUNT_API } from '../choices/specifics/RestrictAccountApi';
import { SETUP } from '../choices/specifics/Setup';
import { SUBDOMAIN } from '../choices/specifics/Subdomain';
import { WEBSOCKETS } from '../choices/specifics/WebSockets';
import { generateImport, Import, Option } from './util';

export const CONTEXT = 'https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld';

export const CHOICES = [
  INTERNAL,
  BACKEND,
  LOCKING,
  REGISTRATION,
  WEBSOCKETS,
  HTTPS,
  EMAIL,
  AUTHORIZATION,
  SUBDOMAIN,
  INITIALIZE_ROOT,
  SETUP,
  OWNERSHIP,
  RESTRICT_ACCOUNT_API,
  INDEX,
] as const;

// TODO: check if easier is possible, also put in util
// Creates type where the keys are the possible Choice names, and the corresponding value is an option of that Choice.
type ArrayElement<TArray> = TArray extends readonly (infer TEntry)[] ? TEntry : never;
type NamedChoice<TChoices, TName> = ArrayElement<TChoices> & { name: TName };
type ChoiceMap = { [K in ArrayElement<typeof CHOICES>['name']]: NamedChoice<typeof CHOICES, K> };
export type Choices = { [K in keyof ChoiceMap]: Option<ChoiceMap[K]> };

export interface Config {
  '@context': typeof CONTEXT,
  import: Import[];
  '@graph': unknown[];
}

export interface Override {
  '@id'?: string,
  comment: string;
  '@type': 'Override',
  overrideInstance: { '@id': string },
  overrideParameters: Record<string, unknown> & { '@type': string },
}

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

function getServerFactoryImport(webSockets: boolean, https: boolean): Import {
  if (webSockets) {
    return generateImport('http', 'server-factory', https ? 'https-websockets' : 'websockets');
  }
  return generateImport('http', 'server-factory', https ? 'https-no-websockets' : 'no-websockets');
}

function generateImports(choices: Choices): Import[] {
  const imports: Import[] = [ ...DEFAULT_IMPORTS ];

  // TODO: not actually catching these errors in the HTML yet
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

function generateOverride(instance: string, type: string, comment: string, params: Record<string, unknown>): Override {
  return {
    comment: comment,
    '@type': 'Override',
    overrideInstance: { '@id': instance },
    overrideParameters: {
      '@type': type,
      ...params,
    }
  }
}

function generateBody(choices: Choices): unknown[] {
  const body: unknown[] = [];

  if (choices.email === TRUE) {
    const comment = 'The settings of your email server.';
    const params = {
      senderName: 'Community Solid Server <solid@example.email>',
      emailConfig_host: 'smtp.example.email',
      emailConfig_port: 587,
      emailConfig_auth_user: 'solid@example.email',
      emailConfig_auth_pass: 'NYEaCsqV7aVStRCbmC'
    }
    body.push(generateOverride('urn:solid-server:default:EmailSender', 'BaseEmailSender', comment, params));
  }

  if (choices.index === TRUE) {
    const comment = 'An example of how the UI converter can be configured.';
    const params = {
      contentType: 'text/html',
      filePath: './node_modules/mashlib/dist/databrowser.html',
      options_container: true,
      options_document: false,
      options_minQuality: 1
    }
    body.push(generateOverride('urn:solid-server:default:DefaultUiConverter', 'ConstantConverter', comment, params));
  }

  if (choices.backend === 'regex') {
    const comment = 'Overrides the default rule to make sure internal data is stored on the file system.';
    const params = {
      rules: [
        {
          comment: 'Stores internal data in the file system',
          '@type': 'RegexRule',
          regex: '^/\\.internal/',
          store: { '@id': 'urn:solid-server:default:FileResourceStore' }
        },
        {
          comment: 'Send everything else to the SPARQL store.',
          '@type': 'RegexRule',
          regex: '.*',
          store: { '@id': 'urn:solid-server:default:SparqlResourceStore' }
        }
      ]
    };
    body.push(generateOverride('urn:solid-server:default:RouterRule', 'RegexRouterRule', comment, params));
  }

  if (choices.backend === 'pod-quota-file') {
    const commentStrategy = 'Sets the maximum pod size to the given values.';
    const paramsStrategy = {
      limit_amount: '7000',
      limit_unit: 'bytes',
    }
    body.push(generateOverride('urn:solid-server:default:QuotaStrategy', 'PodQuotaStrategy', commentStrategy, paramsStrategy));

    const commentReporter = 'Ignores internal data when calculating size.';
    const paramsReporter = {
      ignoreFolders: [ "^/\\.internal$" ],
    }
    body.push(generateOverride('urn:solid-server:default:SizeReporter', 'FileSizeReporter', commentReporter, paramsReporter));
  }

  return body;
}

/**
 * Completes a partial Choices object by using the defaults of all the unchosen options.
 */
function applyDefaults(partialChoices: Partial<Choices>): Choices {
  const choices = {} as Record<keyof Choices, string>;

  for (const choice of CHOICES) {
    choices[choice.name] = partialChoices[choice.name] ?? choice.default;
  }

  return choices as Choices;
}

/**
 * Generate a configuration based on the provided choices.
 */
export function generateConfig(partialChoices: Partial<Choices>): Config {
  const choices = applyDefaults(partialChoices);

  const imports = generateImports(choices).sort();
  const body = generateBody(choices);

  return {
    '@context': CONTEXT,
    import: imports,
    '@graph': body,
  };
}
