// @/api/utils/request.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function request(path, { data = null, token = null, method = 'GET' }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (token) {
    headers.append('Authorization', `Token ${token}`);
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: method !== 'GET' && method !== 'DELETE' ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      // Se a resposta não for bem-sucedida, tentaremos analisar o JSON para extrair a mensagem de erro.
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unknown Error');
    }

    // Para operações DELETE, que podem não retornar conteúdo.
    if (method === 'DELETE') {
      return { deleted: true };  // Indicamos que foi deletado com sucesso.
    }

    // Para outros métodos que retornam dados, retornaremos o JSON analisado.
    return response.json();
  } catch (error) {
    console.error(`API Request Error: ${error}`);
    throw error;  // Ou trate o erro como achar melhor.
  }
}
