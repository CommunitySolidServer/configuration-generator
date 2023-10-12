import { FALSE, TRUE } from '../data/Choice';
import { Choices } from '../data/data';

/**
 * Validates if this combination of choices makes sense.
 */
export function validateChoices(choices: Choices): void {
  if (choices.backend === 'sparql' && choices.internal === 'resource-store') {
    throw new Error('SPARQL backend can not be chosen if the backend is used for internal storage.');
  }

  if (choices.backend === 'regex' && choices.internal === 'memory') {
    throw new Error('Combining the regex backend with in-memory internal storage does not make sense.');
  }

  const rootAccessible = [ 'initialize-root', 'initialize-root-pod' ].includes(choices.initializeRoot);
  const podCreationEnabled = [ 'default' || 'no-accounts' ].includes(choices.accounts);

  if (choices.subdomain === FALSE && rootAccessible && podCreationEnabled) {
    throw new Error('Pod creation needs to be disabled if data will be initialized in the root, unless subdomains are enabled.');
  }

  if (choices.ldp === TRUE && !rootAccessible && !podCreationEnabled) {
    throw new Error('If the Solid protocol is enabled, you need to either initialize data in the root or enable pod creation.');
  }

  if (rootAccessible && choices.ldp === FALSE) {
    throw new Error('Initializing the root with data is useless if the Solid protocol is disabled.');
  }

  if (podCreationEnabled && choices.ldp === FALSE) {
    throw new Error('Pod creation should be disabled if the Solid protocol is disabled as created pods would be inaccessible.');
  }

  if (choices.oidc === FALSE && choices.ldp === FALSE) {
    throw new Error('If both OIDC and the Solid protocol are disabled, there is nothing this server will be able to do.');
  }
}
