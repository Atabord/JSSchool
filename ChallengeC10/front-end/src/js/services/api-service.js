const apiService = (data, method) => ({
  method,
  headers: {
    Authorization: sessionStorage.getItem('token') || null,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export default apiService;
