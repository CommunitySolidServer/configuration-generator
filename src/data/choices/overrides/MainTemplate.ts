import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../../Choice';

/**
 * The main template used for all generated HTML responses.
 */
export const MAIN_TEMPLATE = {
  id: 'mainTemplate',
  label: 'Main HTML template',
  description: `The main HTML body that is used for all HTML pages generated by the server.
  See the <a href="https://github.com/CommunitySolidServer/CommunitySolidServer/blob/main/templates/main.html.ejs">original</a>
  version to know what is expected.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;