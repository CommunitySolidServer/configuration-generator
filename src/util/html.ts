import { Toast } from 'bootstrap';
import { copy } from 'clipboard';
import { Choice } from '../data/Choice';
import { GROUPS } from '../data/data';
import { applyExternalConfig, ModifiedConfig } from '../query/config';
import { filterImports } from '../query/imports';
import { generateConfig } from './config';

/**
 * Generates the configuration and sets it as the inner text of `text`.
 */
export function updateConfig(removeList: string[], externalConfig?: Partial<ModifiedConfig>) {
  const form = document.getElementById('form') as HTMLFormElement;
  const formData = new FormData(form);
  const choices = Object.fromEntries(formData) as NodeJS.Dict<string>;
  const text = document.getElementById('text')!;
  const errorAlert = document.getElementById('error-alert')!;

  // Update the choice headers to indicate which option was chosen there
  for (const choice of GROUPS.map((group) => group.entries).flat()) {
    const button = document.getElementById(`${choice.id}-header`)!.querySelector('button')!;
    const option = (choice.options as Choice['options']).find((opt): boolean => opt.value === choices[choice.id]);
    button.innerHTML = `<strong>${choice.label}</strong>: ${option?.label}`;
  }

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

    // Hide error alert
    errorAlert.hidden = true;
  } catch (err) {
    text.innerText = '{}';
    // Show error alert
    errorAlert.hidden = false;
    const errorText = document.getElementById('error-text')!;
    errorText.innerText = (err as Error).message;
  }
}

/**
 * Copies the configuration to the clipboard
 */
export function copyConfig(): void {
  const text = document.getElementById('text');
  if (text) {
    copy(text.innerText);
    const toastLiveExample = document.getElementById('liveToast')
    if (toastLiveExample) {
      const toast = new Toast(toastLiveExample)
      toast.show()
    }
  }
}
