import { z } from 'zod';

export function getObjectKeys<T extends object>(object: T) {
  return Object.values(object) as (keyof T)[];
}

export function getObjectValues<T extends object>(object: T) {
  return Object.values(object) as T[keyof T][];
}

export function isKeyInObject<T extends object>(
  key: string | number | symbol,
  object: T
): key is keyof T {
  return key in object;
}

export function matchesSchema<T extends z.Schema>(
  data: unknown,
  schema: T
): data is z.infer<T> {
  return schema.safeParse(data).success;
}
export const createSchemaMatcher =
  <T extends z.Schema>(schema: T) =>
  (data: unknown): data is z.infer<T> => {
    return schema.safeParse(data).success;
  };
