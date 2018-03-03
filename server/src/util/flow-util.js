// @flow

// This avoids needing explicit typecasts in calling code.
export function entries<T, U>(obj: {[key: T]: U}): [T, U][] {
  return ((Object.entries(obj): any): [T, U][]);
}

// This avoids needing explicit typecasts in calling code.
export function keys<T, U>(obj: {[key: T]: U}): T[] {
  return ((Object.keys(obj): any): T[]);
}

// This performs Flow type casting of a value
// to a specified type.
// eslint-disable-next-line no-unused-vars
export function cast<T>(value: mixed, _: T): T {
  return ((value: any): T);
}

// This performs Flow type casting of a value to an Object.
export function castObject(value: mixed): Object {
  return ((value: any): Object);
}

// This performs Flow type casting of a value to a string.
export function castString(value: mixed): string {
  return ((value: any): string);
}

// This avoids needing explicit typecasts in calling code.
export function values<T, U>(obj: {[key: T]: U}): U[] {
  return ((Object.values(obj): any): U[]);
}
