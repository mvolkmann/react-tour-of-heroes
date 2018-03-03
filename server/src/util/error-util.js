// @flow

const inTest = process.env.NODE_ENV === 'test';

// istanbul ignore next
export function errorHandler(res: express$Response, error: Error): void {
  const msg = String(error.message ? error.message : error);
  logError(msg);
  res.status(500).send(msg);
  //throw error;
}

export function logError(msg: string): void {
  // istanbul ignore next
  //if (!inTest) console.trace();
  // istanbul ignore next
  if (!inTest) console.error(msg);
}
