// @flow

const inTest = process.env.NODE_ENV === 'test';

// istanbul ignore next
export function errorHandler(next: express$NextFunction, error: Error): void {
  const msg = String(error.message ? error.message : error);
  logError(msg);
  next(new Error(msg)); // invokes builtin Express error handler
}

export function logError(msg: string): void {
  //if (!inTest) console.trace();
  if (!inTest) console.error(msg);
}
