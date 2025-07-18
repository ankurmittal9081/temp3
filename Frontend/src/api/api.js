const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  
  const finalUrl = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(finalUrl, config);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new SyntaxError(`Expected JSON but received ${contentType}. Check API path and server logs.`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${method} ${finalUrl}:`, error);
    throw error;
  }
};

export default request;