// @flow

import sortBy from 'lodash/sortBy';
import mySqlEasier from 'mysql-easier';

import {errorHandler} from './util/error-util';
import {cast} from './util/flow-util';

import type {HeroType} from './types';

type HandlerType = (
  req: express$Request,
  res: express$Response
) => Promise<mixed>;

export function heroService(app: express$Application): void {
  const URL_PREFIX = '/hero';
  app.delete(URL_PREFIX + '/:id', deleteHero);
  app.get(URL_PREFIX, wrap(getAllHeroes));
  app.get(URL_PREFIX + '/:contains', wrap(filterHeroes));
  app.post(URL_PREFIX, wrap(postHero));
  app.put(URL_PREFIX, wrap(putHero));
}

function wrap(handler: HandlerType): HandlerType {
  return async (
    req: express$Request,
    res: express$Response
  ) => {
    try {
      const result = await handler(req, res);
      res.send(result);
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  };
}

export async function deleteHero(req: express$Request): Promise<void> {
  const {id} = req.params;
  const conn = await mySqlEasier.getConnection();
  conn.deleteById('hero', id);
}

export async function filterHeroes(req: express$Request): Promise<HeroType[]> {
  const {contains} = req.params;
  const conn = await mySqlEasier.getConnection();
  const sql = `select * from hero where name like "%${contains}%"`;
  const heroes = await conn.query(sql);
  return sortBy(heroes, ['name']);
}

export async function getAllHeroes(): Promise<HeroType[]> {
  const conn = await mySqlEasier.getConnection();
  const heroes = await conn.getAll('hero');
  return sortBy(heroes, ['name']);
}

export async function postHero(req: express$Request): Promise<number> {
  const body = cast(req.body, Object);
  const conn = await mySqlEasier.getConnection();
  return conn.insert('hero', body);
}

export async function putHero(req: express$Request): Promise<void> {
  const {id} = req.params;
  const body = cast(req.body, Object);
  const conn = await mySqlEasier.getConnection();
  return conn.updateById('hero', id, body);
}
