// @flow

import sortBy from 'lodash/sortBy';
import mySqlEasier from 'mysql-easier';

import {errorHandler} from './util/error-util';

import type {HeroType} from './types';

export function heroService(app: express$Application): void {
  const URL_PREFIX = '/hero';
  app.get(URL_PREFIX, getHeroesHandler);
}

export async function getHeroes(): Promise<HeroType[]> {
  const conn = await mySqlEasier.getConnection();
  const heroes = await conn.query('select * from hero');
  return sortBy(heroes, ['name']);
}

export async function getHeroesHandler(
  req: express$Request,
  res: express$Response
): Promise<void> {
  try {
    res.send(await getHeroes());
  } catch (e) {
    // istanbul ignore next
    errorHandler(res, e);
  }
}
