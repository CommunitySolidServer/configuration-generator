import { Choice } from '../Choice';
import { AUTHORIZATION } from '../choices/Authorization';
import { HTTPS } from '../choices/Https';
import { Group } from '../Group';

export const SECURITY = {
  id: 'security',
  label: 'Security',
  description: 'Features related to the security of the server.',
  entries: [
    HTTPS,
    AUTHORIZATION,
  ],
} as const satisfies Group<Choice>;
