import { generateConfig } from './util/config';


const form = document.getElementById('form') as HTMLFormElement;

// Generates the configuration and sets it as the inner text of `text`
function updateConfig() {
  const formData = new FormData(form);
  const choices = Object.fromEntries(formData);
  const config = generateConfig(choices);
  const text = document.getElementById('text')!;
  text.innerText = JSON.stringify(config, null, 2);
}

updateConfig();

// Update the configuration every time someone changes an input
const inputs = form.getElementsByTagName('input');
for(const input of inputs) {
  input.addEventListener('click', updateConfig);
}
