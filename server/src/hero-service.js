// @flow

//import cors from 'cors';
import sortBy from 'lodash/sortBy';
import mySqlEasier from 'mysql-easier';

import {errorHandler} from './util/error-util';
import {castObject} from './util/flow-util';

import type {HeroType} from './types';

type HandlerType = (
  req: express$Request,
  res: express$Response
) => Promise<mixed>;

let conn; // database connection

// This maps URLs to handler functions.
export function heroService(app: express$Application): void {
  //const theCors = cors({preflightContinue: true});
  const URL_PREFIX = '/hero';
  app.delete(URL_PREFIX + '/:id', /*theCors,*/ deleteHero);
  app.get(URL_PREFIX, wrap(getAllHeroes));
  app.get(URL_PREFIX + '/:contains', wrap(filterHeroes));
  app.post(URL_PREFIX, wrap(postHero));
  app.put(URL_PREFIX, /*theCors,*/ wrap(putHero));
}

export function deleteHero(req: express$Request): void {
  conn.deleteById('hero', req.params.id);
}

export async function filterHeroes(req: express$Request): Promise<HeroType[]> {
  const {contains} = req.params;
  const sql = `select * from hero where name like "%${contains}%"`;
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

export function putHero(req: express$Request): Promise<void> {
  const hero = ((req.body: any): HeroType);
  const {id} = hero;
  delete hero.id;
  return conn.updateById('hero', id, hero);
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
