export const http = (url: string, options?: any) => {
  const token = localStorage.getItem('token');
  return fetch( url, {...options as Request, headers: {
    ...options?.headers,
      ...token && {authorization: `Bearer ${token}`}
    }})
};
