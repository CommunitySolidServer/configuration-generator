import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * The folder from where the pod templates will be loaded.
 */
export const POD_TEMPLATE = {
  id: 'podTemplate',
  label: 'Pod template folder',
  description: `The path to the folder that contains the templates that are used to instantiate a new pod.
  The path is relative to where the Node.js process is executed from,
  or, if it starts with <code>@css:</code>, relative to the install location of CSS.
  HandleBars is used to interpret the templates.</p>
  <p>The WebID is always expected to be in <code>profile/card#me</code>.
  The folder is expected to have separate folders to differentiate between the chosen authorization systems,
  see the original <a href="https://github.com/CommunitySolidServer/CommunitySolidServer/tree/main/templates/pod">templates</a> for an example.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
