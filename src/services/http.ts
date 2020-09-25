export const http = (url: string, options?: RequestInit) => {
  const token = localStorage.getItem('token');
  return fetch( url, {...options as Request, headers: {
    ...options?.headers,
      ...token && {authorization: `Bearer ${token}`}
    }})
};
