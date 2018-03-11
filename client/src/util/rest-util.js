// @flow

import {OK, handleError} from '../util/error-util';

export async function deleteResource(urlSuffix: string): Promise<void> {
  const url = getUrlPrefix() + urlSuffix;
  //TODO: Why is this needed for DELETE, but not for other methods?
  const options = {
    method: 'DELETE',
    headers: {'Access-Control-Allow-Origin': '*'}
  };
  const res = await fetch(url, options);
  if (!res.ok) handleError(res.statusText);
}

export async function getJson(urlSuffix: string): Promise<mixed> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {method: 'GET'};
  const res = await fetch(url, options);
  if (res.status !== OK) return handleError(res.statusText);

  const json = await res.json();
  return json;
}

export async function getText(urlSuffix: string): Promise<mixed> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {method: 'GET'};
  const res = await fetch(url, options);
  if (res.status !== OK) {
    return handleError(res.statusText);
  }

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
  bodyObj: Object
): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {
    method: 'PATCH',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await fetch(url, options);
  if (!res.ok) handleError(res.statusText);
  return res;
}

// For POST requests with no body
export async function post(urlSuffix: string): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {method: 'POST'};
  const res = await fetch(url, options);
  if (!res.ok) handleError(res.statusText);
  return res;
}

// For POST requests with a JSON body
export async function postJson(
  urlSuffix: string,
  bodyObj: Object
): Promise<number> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    handleError(res.statusText);
    return 0;
  }

  const newId = await res.text();
  return Number(newId);
}

export async function putJson(
  urlSuffix: string,
  bodyObj?: Object = {}
): Promise<Object> {
  const url = getUrlPrefix() + urlSuffix;
  const options = {
    method: 'PUT',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await fetch(url, options);
  if (!res.ok) handleError(res.statusText);
  return res;
}
