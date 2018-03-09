// @flow

const inTest = process.env.NODE_ENV === 'test';

// istanbul ignore next
export function errorHandler(res: express$Response, error: Error): void {
  const msg = String(error.message ? error.message : error);
  logError(msg);
  res.status(500).send(msg);
}

export function logError(msg: string): void {
  //if (!inTest) console.trace();
  if (!inTest) console.error(msg);
}
