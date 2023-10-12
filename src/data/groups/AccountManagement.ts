import { Choice } from '../Choice';
import { ACCOUNTS } from '../choices/Accounts';
import { EMAIL } from '../choices/Email';
import { OIDC } from '../choices/Oidc';
import { SUBDOMAIN } from '../choices/Subdomain';
import { Group } from '../Group';

export const ACCOUNT_MANAGEMENT = {
  id: 'account-management',
  label: 'Account management',
  description: 'Everything related to registering and creating new accounts and pods on the server.',
  entries: [
    ACCOUNTS,
    EMAIL,
    SUBDOMAIN,
    OIDC,
  ],
} as const satisfies Group<Choice>;
