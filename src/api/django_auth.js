// @/api/django_auth.js

import { request } from '@/utils';

export function djangoSignIn(username, password) {
  return request('/auth/token/login/', {
    data: { username, password },
    method: 'POST'
  });
}

export function djangoRegister(username, password) {
  return request('/auth/users/', {
    data: { username, password },
    method: 'POST'
  });
}

export function djangoMetamaskRegister(address, signature) {
  return request('/auth/metamask/register/', {
    data: { address, signature },
    method: 'POST'
  });
}

export function djangoMetamaskLogin(address, signature) {
  return request('/auth/metamask/login/', {
    data: { address, signature },
    method: 'POST'
  });
}
