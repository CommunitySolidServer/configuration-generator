import { Choice } from '../Choice';
import { EMAIL } from '../choices/Email';
import { REGISTRATION } from '../choices/Registration';
import { SUBDOMAIN } from '../choices/Subdomain';
import { Group } from '../Group';

export const PODS = {
  id: 'pods',
  label: 'Pod management',
  description: 'Everything related to registering and creating new pods on the server.',
  entries: [
    REGISTRATION,
    EMAIL,
    SUBDOMAIN,
  ],
} as const satisfies Group<Choice>;
