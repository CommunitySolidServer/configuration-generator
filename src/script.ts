import { applyExternalConfig, ModifiedConfig, parseConfigParameter } from './query/config';
import { filterImports, parseRemoveImportsParameter } from './query/imports';
import { handleOptionsParameter } from './query/options';
import { generateConfig } from './util/config';

// Import our bootstrap CSS and JS
import '/styling/main.js';

const searchParams = new URLSearchParams(location.search);
const removeList = parseRemoveImportsParameter(searchParams.get('removeImports'));

let externalConfig: Partial<ModifiedConfig> | undefined;
parseConfigParameter(searchParams.get('config')).then((config): void => {
  externalConfig = config;
  // Update the config once we got a result as this could impact the result
  updateConfig();
}).catch(console.error);

try {
  handleOptionsParameter(searchParams.get('options'));
} catch (error) {
  console.error(error);
}

const form = document.getElementById('form') as HTMLFormElement;

// Generates the configuration and sets it as the inner text of `text`
function updateConfig() {
  const formData = new FormData(form);
  const choices = Object.fromEntries(formData);
  const text = document.getElementById('text')!;
  try {
    const config = generateConfig(choices);

    try {
      if (externalConfig) {
        applyExternalConfig(config, externalConfig);
      }
    } catch (error) {
      console.error(error);
    }

    // TODO: would be nice if we could introduce empty lines in the output JSON where imports were removed
    //       and add a newline between the default CSS imports and the new ones added by external configurations
    //       this required doing some of the JSON generation ourselves, but might still be feasible
    config.import = filterImports(config.import, removeList);

    text.innerText = JSON.stringify(config, null, 2);
  } catch (error) {
    text.innerText = `Error: ${(error as Error).message}`;
  }
}

updateConfig();

// Update the configuration every time someone changes an input
const inputs = form.getElementsByTagName('input');
for(const input of inputs) {
  input.addEventListener('click', updateConfig);
}
