import { INDEX } from '../choices/Index';
import { OWNERSHIP } from '../choices/Ownership';
import { RESTRICT_ACCOUNT_API } from '../choices/RestrictAccountApi';
import { Group } from '../Group';

export const ADVANCED = {
  id: 'advanced',
  name: 'Advanced features',
  description: `Advanced features. You should not change these options unless you are sure what they do.`,
  choices: [
    OWNERSHIP,
    RESTRICT_ACCOUNT_API,
    INDEX,
  ]
} as const satisfies Group;
