import { AUTHORIZATION } from '../choices/Authorization';
import { HTTPS } from '../choices/Https';
import { Group } from '../Group';

export const SECURITY = {
  id: 'security',
  name: 'Security',
  description: 'Features related to the security of the server.',
  choices: [
    HTTPS,
    AUTHORIZATION,
  ]
} as const satisfies Group;
