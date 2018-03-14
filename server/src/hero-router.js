// @flow

import express from 'express';
import sortBy from 'lodash/sortBy';
import mySqlEasier from 'mysql-easier';

import {errorHandler} from './util/error-util';
import {castObject} from './util/flow-util';

type HandlerType = (
  req: express$Request,
  res: express$Response
) => Promise<mixed>;

export type HeroType = {
  id: number,
  name: string
};

let conn; // database connection

// This maps URLs to handler functions.
const router = express.Router();
router.delete('/:id', wrap(deleteHero));
router.get('/', wrap(getAllHeroes));
router.get('/:id', wrap(getHeroById));
router.get('/contains/:contains', wrap(filterHeroes));
router.post('/', wrap(postHero));
router.put('/:id', wrap(putHero));

export function deleteHero(req: express$Request): Promise<void> {
  conn.deleteById('hero', req.params.id);
  return Promise.resolve(); // allows usage with wrap function
}

export async function filterHeroes(req: express$Request): Promise<HeroType[]> {
  const {contains} = req.params;
  let sql = 'select * from hero';
  if (contains) sql += ` where name like "%${contains}%"`;
  const heroes = await conn.query(sql);
  return sortBy(heroes, ['name']);
}

export async function getAllHeroes(): Promise<HeroType[]> {
  const heroes = await conn.getAll('hero');
  return sortBy(heroes, ['name']);
}

export function getHeroById(req: express$Request): Promise<HeroType> {
  const {id} = req.params;
  return conn.getById('hero', id);
}

export function postHero(req: express$Request): Promise<number> {
  const {name} = castObject(req.body);
  if (!name) {
    throw new Error('postHero requires body to have name property');
  }
  return conn.insert('hero', {name});
}

export async function putHero(req: express$Request): Promise<void> {
  const {id} = req.params;
  const hero = ((req.body: any): HeroType);
  delete hero.id;
  await conn.updateById('hero', id, hero);
}

// This is needed by tests since they call functions
// defined here without using the wrap function.
export async function setConn(): Promise<void> {
  conn = await mySqlEasier.getConnection();
}

// This acquires a database connection
// and provides common error handling
// for all the REST services defined here.
function wrap(handler: HandlerType): HandlerType {
  return async (req: express$Request, res: express$Response) => {
    try {
      await setConn();
      let result = await handler(req, res);
      await conn.done();
      // Change numeric results to a string so
      // Express won't think it is an HTTP status code.
      if (typeof result === 'number') result = String(result);
      res.send(result);
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  };
}

export default router;
