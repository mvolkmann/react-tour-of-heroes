// @flow

import express from 'express';
import mySqlEasier from 'mysql-easier';

import {errorHandler} from './util/error-util';
import {cast, castString} from './util/flow-util';

const NOT_FOUND = 404;
const OK = 200;

export async function deleteAll(tableName: string): Promise<void> {
  const conn = await mySqlEasier.getConnection();
  return conn.deleteAll(tableName);
}

export async function deleteById(
  tableName: string,
  id: number
): Promise<number> {
  const conn = await mySqlEasier.getConnection();
  const {affectedRows} = await conn.deleteById(tableName, id);
  return affectedRows;
}

export async function getAll(tableName: string): Promise<Object[]> {
  const conn = await mySqlEasier.getConnection();
  return conn.getAll(tableName);
}

export async function getById(tableName: string, id: number): Promise<Object> {
  const conn = await mySqlEasier.getConnection();
  return conn.getById(tableName, id);
}

export async function patch(
  tableName: string,
  id: number,
  changes: Object
): Promise<Object> {
  const conn = await mySqlEasier.getConnection();
  const obj = await conn.getById(tableName, id);
  const newObj = {...obj, ...changes};
  await conn.updateById(tableName, id, newObj);
  return newObj;
}

// Returns id of new row.
export async function post(tableName: string, data: Object): Promise<number> {
  const conn = await mySqlEasier.getConnection();
  return conn.insert(tableName, data);
}

export async function put(
  tableName: string,
  id: number,
  newObj: Object
): Promise<void> {
  const conn = await mySqlEasier.getConnection();
  await conn.updateById(tableName, id, newObj);
}

export async function query(
  tableName: string,
  where: string
): Promise<Object[]> {
  const conn = await mySqlEasier.getConnection();
  //TODO: Need to protect against SQL injection here!
  const sql = `select * from ${tableName} where ${where}`;
  return conn.query(sql);
}

/**
 * This implements CRUD REST services for a given database table.
 * It currently has the following limitations:
 * 1) Only MySQL databases are supported.
 * 2) The table must have an "id" column
 *    that is an "int auto_increment primary key".
 */
export default function getCrudRouter(tableName: string) {

  /**
   * This code works, but should it be provided?
   */
  async function deleteAllHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    try {
      await deleteAll(tableName);
      res.send();
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function deleteByIdHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    const id = Number(req.params.id);
    try {
      const affectedRows = await deleteById(tableName, id);
      res.send(String(affectedRows));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function getAllHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    try {
      const rows = await getAll(tableName);
      res.send(JSON.stringify(rows));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function getByIdHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    const id = Number(req.params.id);
    try {
      const row = await getById(tableName, id);
      res.status(row ? OK : NOT_FOUND).send(JSON.stringify(row));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function patchHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const changes = cast(req.body, Object);
    try {
      const newObj = await patch(tableName, id, changes);
      res.status(OK).send(JSON.stringify(newObj));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function postHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    try {
      const body = cast(req.body, Object);
      const id = await post(tableName, body);
      res.send(JSON.stringify(id));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function putHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const newVersion = cast(req.body, Object);
    try {
      const newObj = await put(tableName, id, newVersion);
      res.status(OK).send(JSON.stringify(newObj));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  async function queryHandler(
    req: express$Request,
    res: express$Response
  ): Promise<void> {
    const where = castString(req.body);
    try {
      const rows = await query(tableName, where);
      res.send(JSON.stringify(rows));
    } catch (e) {
      // istanbul ignore next
      errorHandler(res, e);
    }
  }

  const router = express.Router();
  const URL_PREFIX = '/' + tableName;
  router.delete(URL_PREFIX, deleteAllHandler);
  router.delete(URL_PREFIX + '/:id', deleteByIdHandler);
  router.get(URL_PREFIX, getAllHandler);
  router.get(URL_PREFIX + '/query', queryHandler);
  router.get(URL_PREFIX + '/:id', getByIdHandler);
  router.patch(URL_PREFIX + '/:id', patchHandler);
  router.post(URL_PREFIX, postHandler);
  router.put(URL_PREFIX + '/:id', putHandler);

  return router;
}
