import { Choices, CHOICES } from '../choices/choices';
import { generateBody } from './body';
import { generateImports, Import } from './imports';

export const CONTEXT = 'https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld';

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
