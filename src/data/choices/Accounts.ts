import { Choice } from '../Choice';

/**
 * Allow registration on the server.
 */
export const ACCOUNTS = {
  id: 'accounts',
  label: 'Accounts',
  description: `Everything related to account management.
  The two final options still enable account management, but disable certain features for users.
  </p><p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    If this is enabled anyone will be able to create new pods on your server.`,
  options: [
    { value: 'default', label: 'Enabled'},
    { value: 'disabled', label: 'Disabled'},
    { value: 'no-accounts', label: 'No new accounts'},
    { value: 'no-pods', label: 'No new pods'},
    { value: 'no-accounts-pods', label: 'No new accounts and no new pods for existing accounts'},
  ],
  default: 'default',
} as const satisfies Choice<'default' | 'disabled' | 'no-accounts' | 'no-pods' | 'no-accounts-pods'>;
