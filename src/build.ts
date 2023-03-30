import { renderFile } from 'ejs';
import { mkdir, readFile, rename, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { GROUPS } from './data/data';

async function getMajorVersion(): Promise<string> {
  const packageJsonPath = join(__dirname, '../package.json');
  const data = await readFile(packageJsonPath, 'utf-8');
  const json = await JSON.parse(data);
  const { version } = json;
  const match = /^(\d+)/.exec(version)!;
  return match[1];
}

async function generateHtml(): Promise<void> {
  const version = await getMajorVersion();
  const templatesDir = join(__dirname, '../templates/');
  const webpackDir = join(__dirname, '../webpack/');
  const htmlDir = join(__dirname, `../html/`);
  const versionDir = join(htmlDir, `/v${version}/`);

  // Move webpack output to specific version.
  // Requires target to not exist yet but does require parent folder.
  await mkdir(htmlDir, { recursive: true });
  try {
    await rm(versionDir, { recursive: true });
  } catch {
    // Directory (probably) doesn't exist yet
  }
  await rename(webpackDir, versionDir);

  const index = await renderFile(join(templatesDir, 'index.html.ejs'), { version });
  const page = await renderFile(join(templatesDir, 'version.html.ejs'), { groups: GROUPS });
  await writeFile(join(htmlDir, 'index.html'), index, 'utf-8');
  await writeFile(join(versionDir, 'index.html'), page, 'utf-8');
}

generateHtml();
