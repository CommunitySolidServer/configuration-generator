// Import our bootstrap CSS and JS
import '/styling/main.js';
import { ModifiedConfig, parseConfigParameter } from './query/config';
import { parseRemoveImportsParameter } from './query/imports';
import { handleOptionsParameter } from './query/options';
import { copyConfig, updateConfig } from './util/html';

const searchParams = new URLSearchParams(location.search);
const removeList = parseRemoveImportsParameter(searchParams.get('removeImports'));

// Load the external config, potentially by doing HTTP requests
let externalConfig: Partial<ModifiedConfig> | undefined;
parseConfigParameter(searchParams.get('config')).then((config): void => {
  externalConfig = config;
  // Update the config once we got a result as this could impact what is generated
  updateConfig(removeList, externalConfig);
}).catch(console.error);

try {
  // Remove the options that can no longer be chosen
  handleOptionsParameter(searchParams.get('options'));
} catch (error) {
  console.error(error);
}

// Update the configuration every time someone changes an input
const inputs = document.getElementsByTagName('input');
for (const input of inputs) {
  input.addEventListener('click', () => updateConfig(removeList, externalConfig));
}

// Add listener to copy button
const copyButtons = document.getElementsByClassName('copy-btn');
for (const btn of copyButtons) {
  btn.addEventListener('click', copyConfig);
}

// Update the configuration on page load
updateConfig(removeList, externalConfig);
