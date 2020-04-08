/* global API_URL */
/* global API_PORT */
/* global NODE_ENV */
/* eslint no-undef: ["error", { "typeof": true }] */

export function getApiHost() {
    let host = process.env.API_HOST ? process.env.API_HOST : 'http://localhost';
    if (typeof API_URL !== 'undefined') {
      host = API_URL;
    }
  
    return host;
  }
  
  export function getApiPort() {
    let port = process.env.API_PORT ? process.env.API_PORT : '5000';
    if (typeof API_PORT !== 'undefined') {
      port = API_PORT;
    }
  
    return port;
  }
  
  export function getApiRoute(path) {
    const newPath = (path[0] === '/') ? path.substr(1) : path;
  
    const host = getApiHost();
    const port = getApiPort();
  
    return `${host}:${port}/${newPath}`;
  }
  
  export function getNodeEnv() {
    let nodeEnv = process.env.NODE_ENV;
    if (typeof NODE_ENV !== 'undefined') {
      nodeEnv = NODE_ENV;
    }
  
    return (nodeEnv || 'development').toLowerCase();
  }