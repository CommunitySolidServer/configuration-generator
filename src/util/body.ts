import { FALSE, TRUE } from '../data/Choice';
import { NOTIFICATIONS } from '../data/choices/Notifications';
import { Choices, Option } from '../data/data';

interface Override {
  '@id'?: string,
  comment: string | string[];
  '@type': 'Override',
  overrideInstance: { '@id': string },
  overrideParameters: Record<string, unknown> & { '@type': string },
}

function generateOverride(instance: string, type: string, comment: string | string[], params: Record<string, unknown>): Override {
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

/**
 * Generates all the necessary overrides and other components needed when specific options are chosen.
 */
export function generateBody(choices: Choices): unknown[] {
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
      limit_amount: 7000,
      limit_unit: 'bytes',
    }
    body.push(generateOverride('urn:solid-server:default:QuotaStrategy', 'PodQuotaStrategy', commentStrategy, paramsStrategy));

    const commentReporter = 'Ignores internal data when calculating size.';
    const paramsReporter = { ignoreFolders: [ '^/\\.internal$' ] }
    body.push(generateOverride('urn:solid-server:default:SizeReporter', 'FileSizeReporter', commentReporter, paramsReporter));
  }

  if (choices.initializeRoot === 'initialize-root-pod') {
    const comment = [ 'The login settings of the account of the root pod. ',
      'It is advised to immediately change this password after starting the server.' ];
    const params = {
      email: 'test@example.com',
      password: 'secret!',
    }
    body.push(generateOverride('urn:solid-server:default:RootPodInitializer', 'AccountInitializer', comment, params));
  }

  if (choices.notificationDuration === TRUE && ([ 'all', 'websockets', 'new-old-websockets' ] satisfies Option<typeof NOTIFICATIONS>[] as string[]).includes(choices.notifications)) {
    const comment = 'How long WebSocketChannel2023 subscriptions can exist, in minutes.';
    const params = { maxDuration: 20160 }
    body.push(generateOverride('urn:solid-server:default:WebSocket2023Subscriber', 'NotificationSubscriber', comment, params));
  }

  if (choices.notificationDuration === TRUE && ([ 'all', 'webhooks' ] satisfies Option<typeof NOTIFICATIONS>[] as string[]).includes(choices.notifications)) {
    const comment = 'How long WebHookChannel2023 subscriptions can exist, in minutes.';
    const params = { maxDuration: 20160 }
    body.push(generateOverride('urn:solid-server:default:WebHookSubscriber', 'NotificationSubscriber', comment, params));
  }

  if (choices.lockExpiration === TRUE && choices.locking !== FALSE) {
    const comment = 'The new expiration time for inactive locks, in milliseconds.';
    const params = { expiration: 6000 }
    body.push(generateOverride('urn:solid-server:default:ResourceLocker', 'WrappedExpiringReadWriteLocker', comment, params));
  }

  if (choices.containerIndex === TRUE) {
    const comment = 'The new index resource and supported media range.';
    const params = {
      indexName: 'index.html',
      mediaRange: 'text/html',
    }
    body.push(generateOverride('urn:solid-server:default:ResourceStore_Index', 'IndexRepresentationStore', comment, params));
  }

  if (choices.podTemplate === TRUE) {
    let comment = 'The location of the new pod templates folder.';
    let params: Record<string, string> = { templateFolder: '@css:templates/pod' }
    body.push(generateOverride('urn:solid-server:default:PodResourcesGenerator', 'StaticFolderGenerator', comment, params));

    comment = 'Where the WebID is located in the generated pod, relative to the root.';
    params = { relativeWebIdPath: 'profile/card#me' }
    body.push(generateOverride('urn:solid-server:default:PodCreator', 'BasePodCreator', comment, params));
  }

  if (choices.mainTemplate === TRUE) {
    const comment = 'The main HTML template used by all HTML pages.';
    const params = { template: '@css:templates/main.html.ejs' };
    body.push(generateOverride('urn:solid-server:default:MainTemplateEngine', 'StaticTemplateEngine', comment, params));
  }

  if (choices.accountHtmlTemplate === TRUE) {
    const comment = 'The email/password registration page.';
    const params = { filePath: '@css:templates/identity/password/register.html.ejs' };
    body.push(generateOverride('urn:solid-server:default:RegisterPasswordAccountHtml', 'HtmlViewEntry', comment, params));
  }

  if (choices.oidcConfiguration === TRUE) {
    const comment = 'The updated OIDC configuration.';
    const params = {
      config: {
        claims: {
          openid: [ 'azp' ],
          webid: [ 'webid' ],
        },
        clockTolerance: 120,
        cookies: {
          long: { signed: true, maxAge: 86400000 },
          short: { signed: true },
        },
        enabledJWA: {
          dPoPSigningAlgValues: [
            'RS256', 'RS384', 'RS512',
            'PS256', 'PS384', 'PS512',
            'ES256', 'ES256K', 'ES384', 'ES512',
            'EdDSA',
          ],
        },
        features: {
          claimsParameter: { enabled: true },
          clientCredentials: { enabled: true },
          devInteractions: { enabled: false },
          dPoP: { enabled: true },
          introspection: { enabled: true },
          registration: { enabled: true },
          revocation: { enabled: true },
          userinfo: { enabled: false },
        },
        scopes: [ 'openid', 'profile', 'offline_access', 'webid' ],
        subjectTypes: [ 'public' ],
        ttl: {
          AccessToken: 3600,
          AuthorizationCode: 600,
          BackchannelAuthenticationRequest: 600,
          ClientCredentials: 600,
          DeviceCode: 600,
          Grant: 1209600,
          IdToken: 3600,
          Interaction: 3600,
          RefreshToken: 86400,
          Session: 1209600,
        },
      }
    }
    body.push(generateOverride('urn:solid-server:default:IdentityProviderFactory', 'IdentityProviderFactory', comment, params));
  }

  return body;
}
