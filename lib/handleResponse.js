export const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json,
        };
        return Promise.reject(error);
      }
      return json;
    })
}
