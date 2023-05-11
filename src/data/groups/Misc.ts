import { Choice } from '../Choice';
import { INITIALIZE_ROOT } from '../choices/InitializeRoot';
import { NOTIFICATIONS } from '../choices/Notifications';
import { SETUP } from '../choices/Setup';
import { Group } from '../Group';

export const MISC = {
  id: 'misc',
  label: 'Miscellaneous',
  description: 'Miscellaneous features not related to a specific category.',
  entries: [
    NOTIFICATIONS,
    INITIALIZE_ROOT,
    SETUP,
  ],
} as const satisfies Group<Choice>;
