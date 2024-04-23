// @/api/django_auth.js

import { request } from '@/utils';

export function signIn(username, password) {
  return request('/auth/token/login/', {
    data: { username, password },
    method: 'POST'
  });
}

export function register(username, password) {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST'
  });
}

export function registerWithMetamask(address, signature) {
  return request('/auth/metamask/register/', {
    data: { address, signature },
    method: 'POST'
  });
}

export function loginWithMetamask(address, signature) {
  return request('/auth/metamask/login/', {
    data: { address, signature },
    method: 'POST'
  });
}
