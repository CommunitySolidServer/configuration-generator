import { writeFile } from 'fs/promises';
import { join } from 'path';
import { renderFile } from 'ejs';
import { CHOICES } from './util/config';

async function generateHtml(): Promise<void> {
  const html = await renderFile(join(__dirname, '../templates/index.html.ejs'), { choices: CHOICES });
  await writeFile(join(__dirname, '../html/index.html'), html, 'utf-8');
}
generateHtml();
