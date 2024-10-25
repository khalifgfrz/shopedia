const FetchConfig = ({ headers }: { headers?: HeadersInit } = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchWithConfig = (endpoint: string, options: RequestInit = {}) => {
    const url = `${baseURL}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    return fetch(url, config);
  };

  return fetchWithConfig;
};

export default FetchConfig;
