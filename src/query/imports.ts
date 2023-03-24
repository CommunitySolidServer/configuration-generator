import { array, string } from 'yup';

const schema = array(string().required()).ensure().required();

export function parseRemoveImportsParameter(input?: string | null): string[] {
  if (!input) {
    return [];
  }
  return schema.validateSync(JSON.parse(input));
}

export function filterImports<T extends string>(imports: T[], removeList: string[]): T[] {
  return imports.filter((imp): boolean => !removeList.some((remove): boolean => imp.includes(remove)));
}
