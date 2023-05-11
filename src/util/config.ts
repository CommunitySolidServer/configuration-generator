import { Choices, GROUPS } from '../data/data';
import { generateBody } from './body';
import { generateImports, Import } from './imports';

// TODO: should somehow update this together with the version number used in build
export const CONTEXT = 'https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^6.0.0/components/context.jsonld';

export interface Config {
  '@context': typeof CONTEXT,
  import: Import[];
  '@graph': unknown[];
}

/**
 * Completes a partial Choices object by using the defaults of all the unchosen options.
 */
function applyDefaults(partialChoices: Partial<Choices>): Choices {
  const choices = {} as Record<keyof Choices, string>;

  for (const choice of GROUPS.map((group) => group.entries).flat()) {
    choices[choice.id] = partialChoices[choice.id] ?? choice.default;
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
