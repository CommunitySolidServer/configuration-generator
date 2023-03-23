import { array, object, string } from 'yup';
import { Config } from '../util/config';

export interface ModifiedConfig {
  '@context': string | string[],
  import: string[];
  '@graph': unknown[];
}

const schema = object({
  '@context': array(string().required()).ensure().optional(),
  import: array(string().required()).optional(),
  '@graph': array(object().required()).optional(),
});

// Matches the default CSS imports
const IMPORT_REGEX = /^css:config(?:\/[^/]+){3}\.json$/;

export async function parseConfigParameter(input?: string | null): Promise<Partial<ModifiedConfig> | undefined> {
  if (!input) {
    return;
  }

  let url: string;
  try {
    url = (new URL(input)).href;
    const res = await fetch(url);
    if (res.status === 200) {
      input = await res.text();
    }
  } catch {
    // Not a valid URL, try to interpret as JSON
  }

  return schema.validate(JSON.parse(input));
}

// Modifies `config` in place
export function applyExternalConfig(config: ModifiedConfig, external?: Partial<ModifiedConfig>): void {
  if (!external) {
    return;
  }

  if (external['@context']) {
    const externalContexts = Array.isArray(external['@context']) ? external['@context'] : [ external['@context'] ];
    const contexts = Array.isArray(config['@context']) ? config['@context'] : [ config['@context'] ];
    for (const context of externalContexts) {
      if (!contexts.includes(context)) {
        contexts.push(context);
      }
    }
    config['@context'] = contexts;
  }

  if (external.import) {
    const filtered = external.import.filter((imp): boolean => !IMPORT_REGEX.exec(imp));
    config.import.push(...filtered);
  }

  if (external['@graph']) {
    config['@graph'].push(...external['@graph']);
  }
}
