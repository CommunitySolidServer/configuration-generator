import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../../Choice';

/**
 * The folder from where the pod templates will be loaded.
 */
export const CONTAINER_INDEX = {
  id: 'containerIndex',
  label: 'Container index resource',
  description: `Determines which resource to return when a container is being read.
  By default, if someone browses to a container they will instead see the <code>index.html</code> resource in that container,
  allowing you to provide users with a nicer result.</p>
  <p>This can be customized, both in the name of the resource to choose (default: <code>index.html</code>),
  and in the accept header situations where this should be done (default: <code>text/html</code>).</p>
  <p>To completely disable this behaviour, configure the media range to be an empty string.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
