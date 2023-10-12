import { Choice } from '../Choice';
import { HTTPS } from '../choices/Https';
import { INITIALIZE_ROOT } from '../choices/InitializeRoot';
import { NOTIFICATIONS } from '../choices/Notifications';
import { Group } from '../Group';

export const MISC = {
  id: 'misc',
  label: 'Miscellaneous',
  description: 'Miscellaneous features not related to a specific category.',
  entries: [
    NOTIFICATIONS,
    INITIALIZE_ROOT,
    HTTPS,
  ],
} as const satisfies Group<Choice>;
