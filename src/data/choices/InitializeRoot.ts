import { Choice } from '../Choice';

/**
 * Initialize root as storage and fully accessible (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED),
 * as a pod, as a static page, or as nothing.
 */
export const INITIALIZE_ROOT = {
  id: 'initializeRoot',
  label: 'Initialize root',
  description: `Determines what needs to happen with the root of the server.
  </p><p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    The "Root pod" option creates a pod in the root with the email and password defined in the configuration.
    It is advised to immediately change this password. 
  </p><p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    The "Accessible root" option writes authorization resources to the root of the server, giving full access to everyone.
    It is advised to immediately update these after starting the server to prevent misuse.
    They will also not disappear after stopping the server and need to be deleted manually afterwards if you use a file system as backend.
`,
  options: [
    { value: 'default', label: 'Inaccessible root' },
    { value: 'static-root', label: 'Static HTML page' },
    { value: 'initialize-root-pod', label: 'Root pod' },
    { value: 'initialize-root', label: 'Accessible root' },
  ],
  default: 'static-root',
} as const satisfies Choice<'default' | 'static-root' | 'initialize-root-pod' | 'initialize-root'>;
