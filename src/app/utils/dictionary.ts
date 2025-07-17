import dictionary from '../dictionary.json';

type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

/**
 * Retrieves a string value from the dictionary using a dot-notation path.
 * @param path - A dot-separated string path (e.g., 'menu.home.title')
 * @returns The string value at the specified path
 * @throws Error if the path doesn't resolve to a string
 */
export const getText = (path: NestedKeyOf<typeof dictionary>): string => {
  // Split the path and traverse the dictionary object
  const result = path.split('.').reduce<unknown>((obj, key) => {
    // Check if current level is a valid object before accessing its property
    if (obj && typeof obj === 'object') {
      return (obj as Record<string, unknown>)[key];
    }
    return undefined;
  }, dictionary);
  
  // Ensure the final result is a string
  if (typeof result !== 'string') {
    throw new Error(`Path ${path} did not resolve to a string`);
  }
  return result;
};
