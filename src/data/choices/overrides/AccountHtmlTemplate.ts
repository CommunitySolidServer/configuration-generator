import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../../Choice';

/**
 * The main template used for all generated HTML responses.
 */
export const ACCOUNT_HTML_TEMPLATE = {
  id: 'accountHtmlTemplate',
  label: 'Account HTML pages',
  description: `The HTML page used when registering an email/password account on the server.
  All other account HTML pages can be replaced similarly by looking in the configuration where the template file occurs.
  All template files can be found
  <a href="https://github.com/CommunitySolidServer/CommunitySolidServer/tree/main/templates/identity/">here</a>.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
