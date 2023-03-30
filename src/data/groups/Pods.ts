import { EMAIL } from '../choices/Email';
import { REGISTRATION } from '../choices/Registration';
import { SUBDOMAIN } from '../choices/Subdomain';
import { Group } from '../Group';

export const PODS = {
  id: 'pods',
  name: 'Pod management',
  description: 'Everything related to registering and creating new pods on the server.',
  choices: [
    REGISTRATION,
    EMAIL,
    SUBDOMAIN,
  ],
} as const satisfies Group;
