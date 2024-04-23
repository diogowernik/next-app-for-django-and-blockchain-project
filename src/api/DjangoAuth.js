// api/DjangoAuth.js

const base_url = 'http://localhost:8000'; // mudar para env.local depois

async function request(path, { data = null, token = null, method = 'GET' }) {
  const headers = {
      'Content-Type': 'application/json',
  };
  
  if (token) {
      headers['Authorization'] = `Token ${token}`;
  }

  const response = await fetch(`${base_url}${path}`, {
      method,
      headers,
      body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
  });

  const responseData = await response.json(); // Assume sempre que a resposta será JSON

  console.log(`Response from ${path}:`, responseData); // Log a resposta para diagnóstico

  if (!response.ok) {
      throw new Error(responseData.message || 'Unknown Error');
  }

  return responseData;
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

export function registerWithMetamask(address, signature) {
  return request('/auth/metamask/register/', {
    data: { address, signature },
    method: 'POST'
  });
}

// api/DjangoAuth.js conferido.

export function loginWithMetamask(address, signature) {
  return request('/auth/metamask/login/', {
    data: { address, signature },
    method: 'POST'
  });
}
