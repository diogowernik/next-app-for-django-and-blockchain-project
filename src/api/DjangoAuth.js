// api/DjangoAuth.js
const base_url = 'http://localhost:8000'; // mudar para env.local depois

async function request(path, { data = null, token = null, method = 'GET' }) {
  return fetch(`${base_url}${path}`, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const json = await response.json();
        const errorMessage = response.status === 400
          ? Object.keys(json).map(key => `${key}: ${json[key].join(', ')}`).join('\n')
          : JSON.stringify(json);
        throw new Error('Erro: ' + errorMessage);
      }
    });
}

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

export function signInWithMetamask(address, signature) {
  return request('/auth/metamask/login/', {
    data: { address, signature },
    method: 'POST'
  });
}

export function registerWithMetamask(address, signature) {
  return request('/auth/metamask/register/', {
    data: { address, signature },
    method: 'POST'
  });
}
