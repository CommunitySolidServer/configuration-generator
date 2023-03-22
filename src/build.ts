import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { renderFile } from 'ejs';
import { CHOICES } from './util/config';

async function generateHtml(): Promise<void> {
  const html = await renderFile(join(__dirname, '../templates/index.html.ejs'), { choices: CHOICES });
  const htmlDir = join(__dirname, '../html/');
  await mkdir(htmlDir, { recursive: true });
  await writeFile(join(htmlDir, 'index.html'), html, 'utf-8');
}
generateHtml();
