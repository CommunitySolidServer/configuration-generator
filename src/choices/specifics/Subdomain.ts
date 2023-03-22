import { BooleanOption, Choice, ENABLED_DISABLED, FALSE, TRUE } from '../Choice';

/**
 * Use subdomain URLs when generating pods.
 */
export const SUBDOMAIN: Choice<BooleanOption> = {
  title: 'Pod URLs',
  description: `How URLs for new pods should be created, appending the name to the base URL as a suffix, or using it as a subdomain.`,
  options: [
    { key: FALSE, label: 'Suffix (<code>https://example.com/test/</code>)' },
    { key: TRUE, label: 'Subdomain (<code>https://test.example.com/</code>)' }
  ],
  default: FALSE,
};
