import { Choice } from '../Choice';
import { ACCOUNT_HTML_TEMPLATE } from '../choices/overrides/AccountHtmlTemplate';
import { CONTAINER_INDEX } from '../choices/overrides/ContainerIndex';
import { LOCK_EXPIRATION } from '../choices/overrides/LockExpiration';
import { MAIN_TEMPLATE } from '../choices/overrides/MainTemplate';
import { NOTIFICATION_DURATION } from '../choices/overrides/NotificationDuration';
import { OIDC_CONFIGURATION } from '../choices/overrides/OidcConfiguration';
import { POD_TEMPLATE } from '../choices/overrides/PodTemplate';
import { Group } from '../Group';

export const PARAMETERS = {
  id: 'parameters',
  label: 'Additional customization',
  description: `These are additional parameters that can be used to fine-tune the server customization.
                Enabling any of these will add a new entry in the generated configuration,
                which you can use to update the necessary values in the <code>overrideParameters</code> block.</p>
                <p>These options are only relevant for specific use cases.
                If you are not sure, you can safely leave them all disabled and the default values will be used.</p>
                <p>Several of these options allow you to provide a path to a file.
                This path is always relative to where the Node.js process is executed from,
                or, if it starts with <code>@css:</code>, relative to the install location of CSS.</p>
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
    MAIN_TEMPLATE,
    ACCOUNT_HTML_TEMPLATE,
    OIDC_CONFIGURATION,
  ],
} as const satisfies Group<Choice>;
