import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Add template to update the OIDC configuration settings. Probably only interested in the timeouts though.
 */
export const OIDC_CONFIGURATION = {
  id: 'oidcConfiguration',
  label: 'OIDC configuration',
  description: `Allows you to modify the OIDC settings of the server.
  This will put the entire OIDC configuration object in the configuration JSON as there is no way to split it up.
  To modify how long OIDC-related tokens are valid you will want to edit the values in the <code>ttl</code> block, in seconds.
  <p>To find an explanation of all fields, see the relevant
  <a href="https://github.com/panva/node-oidc-provider/blob/v7.x/docs/README.md#configuration-options">documentation</a>.</p>`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
