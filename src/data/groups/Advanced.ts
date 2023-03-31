import { INDEX } from '../choices/Index';
import { OWNERSHIP } from '../choices/Ownership';
import { RESTRICT_ACCOUNT_API } from '../choices/RestrictAccountApi';
import { Group } from '../Group';

export const ADVANCED = {
  id: 'advanced',
  name: 'Advanced features',
  description: `<p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i><b>Advanced features</b>. You should not change these options unless you are sure what they do.</p>`,
  choices: [
    OWNERSHIP,
    RESTRICT_ACCOUNT_API,
    INDEX,
  ]
} as const satisfies Group;
