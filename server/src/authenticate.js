// Add this code in index.js for second hands-on exercise.

// A custom middleware function
function authenticate(
  req: express$Request,
  res: express$Response,
  next: express$NextFunction
): void {
  // Don't require authentication for OPTIONS requests.
  if (req.method !== 'OPTIONS' &&
    req.get('Authorization') !== 'magic token') {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
}

// Authenticate only routes that start with /hero.
app.use('/hero', authenticate);
