import { BooleanOption, Choice, FALSE, TRUE } from '../Choice';

/**
 * Use subdomain URLs when generating pods.
 */
export const SUBDOMAIN = {
  id: 'subdomain',
  label: 'Pod URLs',
  description: `How URLs for new pods should be created, appending the name to the base URL as a suffix, or using it as a subdomain.`,
  options: [
    { value: FALSE, label: 'Suffix (<code>https://example.com/foo/</code>)' },
    { value: TRUE, label: 'Subdomain (<code>https://foo.example.com/</code>)' }
  ],
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
