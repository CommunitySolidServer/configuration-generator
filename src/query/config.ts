import { array, object, string } from 'yup';
import { Config } from '../util/config';

export interface ModifiedConfig {
  '@context': string | string[],
  import: string[];
  '@graph': unknown[];
}

const configSchema = object({
  '@context': array(string().required()).ensure().optional(),
  import: array(string().required()).optional(),
  '@graph': array(object().required()).optional(),
});

const urlSchema = array(string().required()).required();

// Matches the default CSS imports
const IMPORT_REGEX = /^css:config(?:\/[^/]+){3}\.json$/;

function isUrl(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

async function fetchConfig(url: string): Promise<Partial<ModifiedConfig>> {
  const res = await fetch(url);
  if (res.status === 200) {
    return configSchema.validate(await res.json());
  }
  console.error(`Unable to fetch config from ${url}: ${await res.text()}`);
  return {}
}

// Merge all external configs together into one
function mergeConfigs(configs: Partial<ModifiedConfig>[]): ModifiedConfig {
  const base: ModifiedConfig = {
    '@context': [],
    import: [],
    '@graph': [],
  };

  for (const config of configs) {
    applyExternalConfig(base, config);
  }
  return base;
}

// 4 options: no input / URL / JSON array of URL strings / JSON body
export async function parseConfigParameter(input?: string | null): Promise<Partial<ModifiedConfig>> {
  if (!input) {
    return {};
  }

  if (isUrl(input)) {
    return fetchConfig(input);
  }

  const json = await JSON.parse(input);

  // Input could potentially be a single JSON string, which we can also interpret as a URL
  if (typeof json === 'string' && isUrl(json)) {
    return fetchConfig(json);
  }

  // Assume an array of URLs if JSON is an array
  if (Array.isArray(json)) {
    const urls = await urlSchema.validate(json);
    const configs = await Promise.all(urls.map(fetchConfig));
    return mergeConfigs(configs);
  }

  // Assume the input is an inline config body
  return configSchema.validate(json);
}

// Modifies `config` in place
export function applyExternalConfig(config: ModifiedConfig, external: Partial<ModifiedConfig>): void {
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
