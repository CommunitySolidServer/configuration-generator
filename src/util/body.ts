import { TRUE } from '../choices/Choice';
import { Choices } from '../choices/choices';

interface Override {
  '@id'?: string,
  comment: string;
  '@type': 'Override',
  overrideInstance: { '@id': string },
  overrideParameters: Record<string, unknown> & { '@type': string },
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
