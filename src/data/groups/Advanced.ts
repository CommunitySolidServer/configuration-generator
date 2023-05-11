import { Choice } from '../Choice';
import { INDEX } from '../choices/Index';
import { OWNERSHIP } from '../choices/Ownership';
import { RESTRICT_ACCOUNT_API } from '../choices/RestrictAccountApi';
import { Group } from '../Group';

export const ADVANCED = {
  id: 'advanced',
  label: 'Advanced features',
  description: `
    </p><p class="text-danger">
      <i class="bi bi-exclamation-triangle me-1"></i><b>Advanced features</b>. You should not change these options unless you are sure what they do.
`,
  entries: [
    OWNERSHIP,
    RESTRICT_ACCOUNT_API,
    INDEX,
  ]
} as const satisfies Group<Choice>;
