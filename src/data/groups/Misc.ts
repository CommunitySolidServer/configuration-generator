import { INITIALIZE_ROOT } from '../choices/InitializeRoot';
import { SETUP } from '../choices/Setup';
import { WEBSOCKETS } from '../choices/WebSockets';
import { Group } from '../Group';

export const MISC = {
  id: 'misc',
  name: 'Miscellaneous',
  description: 'Miscellaneous features not related to a specific category.',
  choices: [
    WEBSOCKETS,
    INITIALIZE_ROOT,
    SETUP,
  ],
} as const satisfies Group;
