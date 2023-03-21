import { joinFilePath, readPackageJson, resolveModulePath } from '@solid/community-server';
import { render, renderFile } from 'ejs';
import { promises as fsPromises } from 'fs';
import { Group, parseGroup } from './parsing';
import { Reader } from './reader';

/**
 * Not being used right now but saved in case this is needed again in the future.
 */

const CONFIG_PATH = resolveModulePath('config');
const TEMPLATE_PATH = joinFilePath(__dirname, '../templates/main.html.ejs');

async function findContext(): Promise<string> {
  const json = await readPackageJson();
  return Object.keys(json['lsd:contexts'])[0];
}

async function findGroups(): Promise<string[]> {
  const dir = await fsPromises.opendir(CONFIG_PATH);
  const groups: string[] = [];
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      groups.push(dirent.name);
    }
  }
  return groups
}

async function getGroupOptions(name: string): Promise<Group> {
  const markdownPath = joinFilePath(CONFIG_PATH, name, 'README.md');
  const markdown = await fsPromises.readFile(markdownPath, 'utf8');
  const reader = new Reader(markdown);
  return parseGroup(reader);
}

async function renderTemplate(): Promise<void> {
  const groupNames = await findGroups();
  const groups = await Promise.all(groupNames.map(getGroupOptions));
  const context = await findContext();

  const html = await renderFile(TEMPLATE_PATH, { groups, context });
  console.log(html);
}

renderTemplate();
