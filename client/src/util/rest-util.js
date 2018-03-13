// @flow

import {OK, handleError} from '../util/error-util';

type MethodType = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
type OptionsType = {
  body?: mixed,
  headers: Object,
  method: MethodType
};

function myFetch(method: MethodType, url: string, body?: mixed) {
  const options: OptionsType = {
    method,
    headers: {
      Authorization: 'magic token'
    }
  };
  if (body !== undefined) {
    const isObject = typeof body === 'object';
    options.body = isObject ? JSON.stringify(body) : body;
    options.headers['Content-Type'] = isObject
      ? 'application/json'
      : 'text/plain';
  }
  if (method === 'DELETE') {
    //TODO: Why needed for DELETE, but not other methods?
    options.headers['Access-Control-Allow-Origin'] = '*';
  }

  // $FlowFixMe
  return fetch(url, options);
}

export async function deleteResource(urlSuffix: string): Promise<void> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('DELETE', url);
  if (!res.ok) handleError(res.statusText);
}

export async function getJson(urlSuffix: string): Promise<mixed> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('GET', url);
  if (res.status !== OK) return handleError(res.statusText);

  const json = await res.json();
  return json;
}

export async function getText(urlSuffix: string): Promise<mixed> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('GET', url);
  if (res.status !== OK) return handleError(res.statusText);

  const text = await res.text();
  return text;
}

// This function will contain more logic
// when we are ready for production deployment.
export function getUrlPrefix() {
  const {hostname} = window.location;
  return `http://${hostname}:3001/`;
}

export async function patchJson(
  urlSuffix: string,
  body: Object
): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('PATCH', url, body);
  if (!res.ok) handleError(res.statusText);
  return res;
}

// For POST requests with no body
export async function post(urlSuffix: string): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('POST', url);
  if (!res.ok) handleError(res.statusText);
  return res;
}

// For POST requests with a JSON body
export async function postJson(
  urlSuffix: string,
  body: Object
): Promise<number> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('POST', url, body);

  if (!res.ok) {
    handleError(res.statusText);
    return 0;
  }

  const newId = await res.text();
  return Number(newId);
}

export async function putJson(
  urlSuffix: string,
  body?: Object = {}
): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const res = await myFetch('PUT', url, body);
  if (!res.ok) handleError(res.statusText);
  return res;
}
