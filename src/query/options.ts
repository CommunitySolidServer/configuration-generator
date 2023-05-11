import { array, lazy, object, Schema, string } from 'yup';

// Remove options from the HTML based on the `options` query parameter.
// This parameter should be a key/value object with keys being choices and values being the list of options that can be chosen.
// This way configurations for external components can disable features that would be incompatible.

// Object with dynamic keys that have string array as value
const schema = lazy((obj) => object(Object.fromEntries(Object.keys(obj).map((key): [ string, Schema ] =>
  [ key, array(string().required()).ensure().required() ]
))));

function validateOptions(id: string, options: string[]): { root: HTMLElement, children: Element[] } {
  const root = document.getElementById(id);
  if (!root) {
    throw new Error(`"${id}" is not a known choice.`);
  }

  const children = Array.from(root.getElementsByClassName('option'));

  // Make sure all chosen options exist
  for (const option of options) {
    if (!children.some((label): boolean => label.id === `${id}:${option}`)) {
      throw new Error(`Unknown option "${option}" for choice "${id}". Not applying changes.`);
    }
  }

  return { root, children };
}

function handleOptions(optionMap: Record<string, string[]>) {
  for (const [ name, options ] of Object.entries(optionMap)) {
    let root: HTMLElement;
    let children: Element[];
    try {
      ({ root, children } = validateOptions(name, options));
    } catch (error) {
      console.error(error);
      continue;
    }

    // Remove everything if there are no options
    if (options.length === 0) {
      root.remove();
      return;
    }

    // If there is only 1 option left we remove the choice for the user
    if (options.length === 1) {
      const hidden = document.createElement('input');
      hidden.setAttribute('type', 'hidden');
      hidden.setAttribute('name', name);
      hidden.setAttribute('value', options[0]);
      root.replaceWith(hidden);
      return;
    }

    // Remove unchosen labels
    for (const element of children) {
      if (!options.some((option): boolean => `${name}:${option}` === element.id)) {
        element.remove();
      }
    }
  }
}

export function handleOptionsParameter(input?: string | null): void {
  if (!input) {
    return;
  }
  const options = schema.validateSync(JSON.parse(input));
  handleOptions(options);
}
