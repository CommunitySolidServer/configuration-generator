import { marked } from 'marked';
import { Reader } from './reader';

/**
 * Not being used right now but saved in case this is needed again in the future.
 */

export interface Group {
  name: string;
  description: string;
  entries: Entry[];
}

export interface Entry {
  name: string;
  description: string;
  options: Option[];
}

export interface Option {
  name: string;
  description: string;
}

const ENTRY_REGEX = /^\*\W*\*([^*]+)\*:\W*(.+)$/;

// TODO: mention how highly unstable this is
export function parseGroup(reader: Reader): Group {
  // `# GROUP_NAME`
  const name = reader.line.slice(`# `.length);
  reader.advance();

  const description = getDescription(reader);
  const entries = [ ...handleSpecifics(reader, '##', parseEntry) ];

  return { name, description, entries };
}

export function parseEntry(reader: Reader): Entry {
  // `## ENTRY_NAME`
  const name = reader.line.slice(`## `.length);
  reader.advance();

  const description = getDescription(reader);
  const options = [ ...handleSpecifics(reader, '*', parseOption) ];

  return { name, description, options };
}

export function parseOption(reader: Reader): Option {
  // `* *OPTION_NAME*: DESCRIPTION`
  const match = ENTRY_REGEX.exec(reader.line)!;
  const name = match[1];
  reader.advance();

  const description = getDescription(reader, match[2]);

  return { name, description };
}

function getDescription(reader: Reader, part?: string): string {
  let lines = [];
  if (part) {
    lines.push(part);
  }
  while (!reader.isFinished() && !reader.line.startsWith('#') && !reader.line.startsWith('*')) {
    lines.push(reader.line);
    reader.advance();
  }
  // This is just here so the tick marks get converted to <code> tags
  return marked(lines.join(' ')).slice('<p>'.length, -'</p>\n'.length);
}

function * handleSpecifics<T>(reader: Reader, symbol: string, fn: (reader: Reader) => T): Iterable<T> {
  while(!reader.isFinished() && reader.line.startsWith(symbol)) {
    yield fn(reader);
  }
}
