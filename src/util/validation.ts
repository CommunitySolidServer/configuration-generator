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
  if (choices.registration === FALSE && choices.setup === FALSE && choices.initializeRoot === FALSE) {
    throw new Error('There would be no way to write data to this server. You need to enable one of registration, setup, or root initialization.');
  }
  if (choices.registration === TRUE && choices.initializeRoot === TRUE && choices.subdomain === FALSE) {
    throw new Error('Initializing the root and enabling registration is only possible when subdomains are used, as nested storages are not allowed in Solid.');
  }
}
