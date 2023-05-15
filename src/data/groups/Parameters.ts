import { Choice } from '../Choice';
import { CONTAINER_INDEX } from '../choices/ContainerIndex';
import { LOCK_EXPIRATION } from '../choices/LockExpiration';
import { NOTIFICATION_DURATION } from '../choices/NotificationDuration';
import { OIDC_CONFIGURATION } from '../choices/OidcConfiguration';
import { POD_TEMPLATE } from '../choices/PodTemplate';
import { Group } from '../Group';

export const PARAMETERS = {
  id: 'parameters',
  label: 'Additional customization',
  description: `These are additional parameters that can be used to fine-tune the server customization.
                Enabling any of these will add a new entry in the generated configuration,
                which you can use to update the necessary values in the <code>overrideParameters</code> block.</p>
                <p>These options are only relevant for specific use cases.
                If you are not sure, you can safely leave them all disabled and the default values will be used.</p>
                <p>The options below are just some of the parameters that can be customized,
                chosen based on what might be useful for people wanting to configure their server.
                If there is another value that you want to customize,
                you can open an issue in the <a href="https://github.com/CommunitySolidServer/configuration-generator/">repository</a>,
                and we will have a look if it is something that can easily be added.`,
  entries: [
    NOTIFICATION_DURATION,
    LOCK_EXPIRATION,
    CONTAINER_INDEX,
    POD_TEMPLATE,
    OIDC_CONFIGURATION,
  ],
} as const satisfies Group<Choice>;
